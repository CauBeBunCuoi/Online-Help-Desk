//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.SignalR;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Identity.Client;
//using Thi_AccountBank.DataAccess;

//namespace Thi_AccountBank.BusinessLogic.Services.signalRHub_services
//{
//    public class HubInitService : IHubInit
//    {
//        private readonly AppDbContext _dbContext;
//        private readonly IHubContext<ChatHub> _hubContext;
//        private readonly IChatbox _chatBoxService;
//        private readonly IMessage _messageService;
//        private readonly IAccount _accountService;

//        public HubInitService(
//            AppDbContext dbContext,
//            IChatbox chatBoxService,
//            IHubContext<ChatHub> hubContext,
//            IMessage messageService,
//            IAccount accountService
//            )
//        {
//            _dbContext = dbContext;
//            _chatBoxService = chatBoxService;
//            _hubContext = hubContext;
//            _messageService = messageService;
//            _accountService = accountService;
//        }

//        public Task event__AppSettings_Receive()
//        {
//            throw new NotImplementedException();
//        }

//        public JsonResult event__FilesExtensionFilter_Recieve()
//        {
//            var fileExtensions = _dbContext.FileExtensions
//                .Where(x =>
//                    //x.ExtensionName == "pt" ||
//                    x.ExtensionName == "pptx" ||
//                    x.ExtensionName == "docx" ||
//                    //x.ExtensionName == "doc" ||
//                    //x.ExtensionName == "xls" ||
//                    x.ExtensionName == "xlsx" ||
//                    x.ExtensionName == "pdf")
//                .ToList()  // Execute the query in memory
//                .Select(x => new
//                {
//                    id = x.Id,
//                    fileExtension = x.ExtensionName,
//                    name = x.ExtensionName switch
//                    {
//                        //"pt" => "PowerPoint",
//                        "pptx" => "PowerPoint",
//                        "docx" => "Word",
//                        //"doc" => "Word",
//                        "pdf" => "PDF",
//                        //"xls" => "Excel",
//                        "xlsx" => "Excel",
//                        _ => "Unknown File"
//                    }
//                });
//            //await _hubContext.Clients.Group(from).SendAsync("FilesExtensionFilter_Receive", result);
//            return new JsonResult(fileExtensions);
//        }

//        public JsonResult event__RoomFilterCategories_Recieve(int userid)
//        {
//            var statuses = new[]
//            {
//                new { id = 1, title = "Tất cả" },
//                new { id = 2, title = "Chưa Đọc" },
//            };

//            int count = 1;
//            var cardTypes = _dbContext.ChatBoxCards
//                .Where(x =>
//                    x.AccountId == userid)
//                .ToList()
//                .Select((x, index) => new
//                {
//                    id = x.Title.Equals("Tin nhắn từ người lạ") ? -1 : count++,
//                    title = x.Title,
//                    color = x.Color,
//                })
//                .OrderBy(x => x.id == -1 ? int.MaxValue : x.id);

//            var result = new
//            {
//                status = statuses,
//                cardType = cardTypes
//            };
//            //await _hubContext.Clients.Group(from).SendAsync("RoomFilterCategories_Recieve", result);
//            return new JsonResult(result);
//        }
//        // TASK C?A CU BÁCH : VI?T EVENT G?I V? file_extension_filter,  roomFilterCategory 

//    }
//}
