using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OnlineHelpDesk_BE.BusinessLogic.Helpers
{
    public class FileHelpers
    {
        private readonly string _baseUrl;
        private readonly string _wwwRootPath;

        public FileHelpers(IConfiguration configuration, IWebHostEnvironment env)
        {
            _baseUrl = configuration["AppSettings:BASE_URL"].ToString();
            _wwwRootPath = env.WebRootPath; // Đường dẫn tuyệt đối đến wwwroot
        }

        public async Task<string> GetImageUrl(string folderName, string fileName)
        {
            try
            {
                fileName = await GetFullFileName(folderName, fileName);
            }
            catch
            {
                return $"{_baseUrl}/wwwroot/{folderName}/unknown.jpg";
            }
            return $"{_baseUrl}/wwwroot/{folderName}/{fileName}";
        }

        public async Task<string> SaveBase64File(string base64Data, string folderName, string fileName)
        {
            try
            {
                var match = Regex.Match(base64Data, "^data:(.+);base64,(.+)$");
                string extension = ".png";
                string data = base64Data;

                if (match.Success)
                {
                    string mimeType = match.Groups[1].Value;
                    data = match.Groups[2].Value;
                    extension = mimeType switch
                    {
                        "image/jpeg" => ".jpg",
                        "image/png" => ".png",
                        "image/gif" => ".gif",
                        _ => ".png"
                    };
                }

                string fullFileName = fileName + extension;
                string filePath = Path.Combine(_wwwRootPath, folderName, fullFileName);

                byte[] buffer = Convert.FromBase64String(data);
                await File.WriteAllBytesAsync(filePath, buffer);

                return filePath;
            }
            catch (Exception ex)
            {
                Console.WriteLine("\n\n\n"+ex.ToString()+"\n\n\n");
                throw new Exception($"Error saving file {fileName}: {ex.Message}");
            }
        }

        public async Task<string> SaveFile(byte[] fileData, string folderName, string fileName, string originalFileName)
        {
            try
            {
                string extension = Path.GetExtension(originalFileName);
                string fullFileName = fileName + extension;
                string filePath = Path.Combine(_wwwRootPath, folderName, fullFileName);

                await File.WriteAllBytesAsync(filePath, fileData);

                return filePath;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error saving file {fileName}: {ex.Message}");
            }
        }

        public async Task DeleteFile(string folderName, string fileName)
        {
            try
            {
                string fileToDelete = await GetFullFileName(folderName, fileName);
                if (fileToDelete == null) return;

                string filePath = Path.Combine(_wwwRootPath, folderName, fileToDelete);
                File.Delete(filePath);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting file {fileName}: {ex.Message}");
            }
        }

        public async Task<string> GetFullFileName(string folderName, string fileName)
        {
            try
            {
                string folderPath = Path.Combine(_wwwRootPath, folderName);
                string[] files = Directory.GetFiles(folderPath);
                foreach (var file in files)
                {
                    string fileWithoutExt = Path.GetFileNameWithoutExtension(file);
                    if (fileWithoutExt == fileName)
                    {
                        return Path.GetFileName(file);
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error getting file name {fileName}: {ex.Message}");
            }
        }

        public async Task CopyFile(string sourceFolder, string sourceFileName, string destinationFolder, string destinationFileName)
        {
            try
            {
                string sourceFilePath = Path.Combine(_wwwRootPath, sourceFolder, sourceFileName);
                string destinationFilePath = Path.Combine(_wwwRootPath, destinationFolder, destinationFileName);

                Directory.CreateDirectory(Path.GetDirectoryName(destinationFilePath));
                File.Copy(sourceFilePath, destinationFilePath, true);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error copying file: {ex.Message}");
            }
        }

        public async Task CreateFolder(string folderName)
        {
            try
            {
                Directory.CreateDirectory(Path.Combine(_wwwRootPath, folderName));
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating folder {folderName}: {ex.Message}");
            }
        }

        public async Task DeleteFolder(string folderName)
        {
            try
            {
                Directory.Delete(Path.Combine(_wwwRootPath, folderName), true);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting folder {folderName}: {ex.Message}");
            }
        }
    }
}
