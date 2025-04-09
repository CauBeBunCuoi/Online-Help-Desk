using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Logging;
using OnlineHelpDesk_BE.BusinessLogic.Helpers;
using OnlineHelpDesk_BE.Common.AppConfigurations.AWS.interfaces;

namespace OnlineHelpDesk_BE.BusinessLogic.Services.AWSServices.S3
{
    public class AWSS3Service
    {
        // LOGGER
        private readonly ILogger<AWSS3Service> _logger;

        // CONFIG
        private readonly IAWSS3Config _awsS3Config;

        // SERVICES
        private readonly FileHelpers _fileHelpers;


        private static string _bucketName;
        private static AmazonS3Client _s3Client;

        public AWSS3Service(IAWSS3Config awsS3Config, ILogger<AWSS3Service> logger, FileHelpers fileHelpers)
        {
            _fileHelpers = fileHelpers;
            _awsS3Config = awsS3Config;
            _bucketName = awsS3Config.BucketName;
            AWSConfigsS3.UseSignatureVersion4 = true;

            _s3Client = new AmazonS3Client(awsS3Config.AccessKey, awsS3Config.SecretKey, RegionEndpoint.APSoutheast1);
            _logger = logger;
        }


        public async Task UploadFileAsync(Stream fileStream, string key)
        {
            try
            {
                var fileTransferUtility = new TransferUtility(_s3Client);

                await fileTransferUtility.UploadAsync(fileStream, _bucketName, key);


            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine($"Error encountered on server. Message:'{e.Message}'");
                throw new HttpRequestException("Error uploading file: " + e.Message.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine($"Unknown encountered on server. Message:'{e.Message}'");
                throw new HttpRequestException("Error uploading file: " + e.Message.ToString());
            }
        }
        public async Task<string> GeneratePresignedUrlAsync(string rootFolderPath, string folderName, string fileName)
        {
            rootFolderPath = rootFolderPath.Replace("\\", "/").TrimStart('/');
            string folderPath = (rootFolderPath + "/" + folderName).Replace("\\", "/").TrimStart('/');
            string urlString = string.Empty;
            try
            {
                string fileKey = await GetFullFileKeyAsync(folderPath, fileName);
                if (string.IsNullOrEmpty(fileKey))
                {
                    string unknownFileName = await GetFullFileKeyAsync(rootFolderPath, "unknown");
                    fileKey = unknownFileName;
                }

                var request = new GetPreSignedUrlRequest()
                {
                    BucketName = _bucketName,
                    Key = fileKey,
                    Expires = DateTime.Now.AddHours(_awsS3Config.PresignedURLExpirationHours),
                };
                urlString = _s3Client.GetPreSignedURL(request);


            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Error:'{ex.Message}'");
                throw new HttpRequestException("Error generating presigned URL: " + ex.Message.ToString());
            }

            return urlString;
        }



        public async Task UploadBase64FileAsync(string base64Data, string folderPath, string fileName)
        {
            try
            {
                // base64Data = _fileHelpers.ResizeBase64Image(base64Data, 1920,1080 );
                var match = Regex.Match(base64Data, "^data:(.+);base64,(.+)$");
                string extension = ".png";
                string data = base64Data;

                if (match.Success)
                {
                    string mimeType = match.Groups[1].Value;
                    // data = match.Groups[2].Value;
                    data = _fileHelpers.ResizeBase64Image(match.Groups[2].Value, _awsS3Config.UploadImageMaxWidth, _awsS3Config.UploadImageMaxHeight);
                    extension = mimeType switch
                    {
                        "image/jpeg" => ".jpg",
                        "image/png" => ".png",
                        "image/gif" => ".gif",
                        _ => ".png"
                    };
                }



                folderPath = folderPath.Replace("\\", "/").TrimStart('/');
                string path = (folderPath + "/" + fileName + extension).Replace("\\", "/").TrimStart('/');
                
                // xoá tất cả file cũ cùng tên nếu có
                string fileKey = await GetFullFileKeyAsync(folderPath, fileName);
                while(!string.IsNullOrEmpty(fileKey))
                {
                    var deleteRequest = new DeleteObjectRequest
                    {
                        BucketName = _bucketName,
                        Key = fileKey
                    };
                    await _s3Client.DeleteObjectAsync(deleteRequest);
                    fileKey = await GetFullFileKeyAsync(folderPath, fileName);
                }


                byte[] fileBytes = Convert.FromBase64String(data);

                using (var stream = new MemoryStream(fileBytes))
                {
                    await UploadFileAsync(stream, $"{path}");
                }

            }
            catch (FormatException ex)
            {
                Console.WriteLine("\n\n\n"+ex.ToString()+"\n\n\n");
                throw new HttpRequestException("Invalid base64 string format. " + ex.Message.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading file. Message: {ex.Message}");
                throw new HttpRequestException("Error uploading file. " + ex.Message.ToString());
            }
        }

        public async Task CopyFileAsync(string sourceFolder, string sourceFileName, string destinationFolder, string destinationFileName)
        {
            sourceFolder = sourceFolder.Replace("\\", "/").TrimStart('/');
            destinationFolder = destinationFolder.Replace("\\", "/").TrimStart('/');
            try
            {
                string sourceFileKey = await GetFullFileKeyAsync(sourceFolder, sourceFileName);
                if (string.IsNullOrEmpty(sourceFileKey))
                {
                    return;
                }
                string destinationFileKey = (destinationFolder + "/" + destinationFileName + sourceFileKey.Substring(sourceFileKey.LastIndexOf('.'))).Replace("\\", "/").TrimStart('/');

                var copyRequest = new CopyObjectRequest
                {
                    SourceBucket = _bucketName,
                    SourceKey = sourceFileKey,
                    DestinationBucket = _bucketName,
                    DestinationKey = destinationFileKey
                };

                await _s3Client.CopyObjectAsync(copyRequest);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine($"Error encountered on server. Message:'{e.Message}'");
                throw new HttpRequestException("Error copying file: " + e.Message.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine($"Unknown encountered on server. Message:'{e.Message}'");
                throw new HttpRequestException("Error copying file: " + e.Message.ToString());
            }
        }

        public async Task<string> GetFullFileKeyAsync(string folderPath, string fileName)
        {
            folderPath = folderPath.Replace("\\", "/").TrimStart('/');
            try
            {
                var request = new ListObjectsV2Request
                {
                    BucketName = _bucketName,
                    Prefix = folderPath + "/"
                };

                var response = await _s3Client.ListObjectsV2Async(request);
                foreach (var obj in response.S3Objects)
                {
                    string fileWithoutExt = Path.GetFileNameWithoutExtension(obj.Key);
                    if (fileWithoutExt == fileName)
                    {
                        return obj.Key;
                    }
                }
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Error:'{ex.Message}'");
                throw new HttpRequestException("Error getting file key: " + ex.Message.ToString());
            }

            return null;
        }

        public async Task DeleteFolderAsync(string folderPath)
        {
            folderPath = folderPath.Replace("\\", "/").TrimStart('/');
            try
            {
                var request = new ListObjectsV2Request
                {
                    BucketName = _bucketName,
                    Prefix = folderPath + "/"
                };

                var response = await _s3Client.ListObjectsV2Async(request);
                foreach (var obj in response.S3Objects)
                {
                    var deleteRequest = new DeleteObjectRequest
                    {
                        BucketName = _bucketName,
                        Key = obj.Key
                    };
                    await _s3Client.DeleteObjectAsync(deleteRequest);
                }
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Error:'{ex.Message}'");
                throw new HttpRequestException("Error deleting folder: " + ex.Message.ToString());
            }
        }
    }
}
