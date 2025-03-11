
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.SignalR;
//using ScriptPalaverBE.Services.chat_services.interfaces;
//using Thi_AccountBank.DataAccess;

//namespace Thi_AccountBank.BusinessLogic.Services.signalRHub_services
//{
//    public class HubChatBoxService : IHubChatBox
//    {
//        private readonly AppDbContext _dbContext;
//        private readonly IHubContext<ChatHub> _hubContext;
//        private readonly IChatbox _chatBoxService;
//        private readonly ScriptPalaverBE.Services.db_services.interfaces.IAccount _accountService;
//        private readonly IAWSS3Service _awsService;
//        private readonly IOpenGraphService _openGraphService;
//        public HubChatBoxService(
//            AppDbContext dbContext,
//            IChatbox chatBoxService,
//            IHubContext<ChatHub> hubContext,
//            IAWSS3Service awsService,
//            IOpenGraphService openGraphService
//            )
//        {
//            _dbContext = dbContext;
//            _chatBoxService = chatBoxService;
//            _hubContext = hubContext;
//            _awsService = awsService;
//            _openGraphService = openGraphService;
//        }

//        public Task AddChatBoxCard()
//        {
//            throw new NotImplementedException();
//        }

//        public Task AddChatBoxCardTagging()
//        {
//            throw new NotImplementedException();
//        }

//        public Task AddChatRoom(string userId, string from)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task AddChatRoom_nhap(string userId, string from)
//        {
//            Console.WriteLine($"\n\n\nUser {userId} added room browser: {from}\n\n\n");
//            try
//            {
//                // T?o chat box m?i v?i tên m?c ð?nh
//                var chatBox = new ChatBox
//                {
//                    ChatBoxName = "Testxx", // Thay GroupName thành ChatBoxName
//                    ChatBoxStatusId = 1,
//                    ChatBoxTypeId = 3,
//                    Created = DateTime.Now
//                };
//                _dbContext.ChatBoxes.Add(chatBox);
//                _dbContext.SaveChanges();

//                // Thêm thành viên vào b?ng ChatBoxMember
//                _dbContext.ChatBoxMembers.Add(new ChatBoxMember
//                {
//                    ChatBoxId = chatBox.Id,
//                    AccountId = Convert.ToInt32(userId),
//                    ChatBoxMemberRoleId = 1,
//                    Created = DateTime.Now
//                });
//                _dbContext.ChatBoxMembers.Add(new ChatBoxMember
//                {
//                    ChatBoxId = chatBox.Id,
//                    AccountId = 2,
//                    ChatBoxMemberRoleId = 2,
//                    Created = DateTime.Now
//                });

//                // Lýu thay ð?i
//                _dbContext.SaveChanges();

//                // Thêm tin nh?n thông báo r?ng ph?ng chat ð? ðý?c t?o
//                _dbContext.Messages.Add(new Message
//                {
//                    ChatBoxId = chatBox.Id, // Thay GroupId thành ChatBoxId
//                    MessageTypeId = 7,
//                    Log = "Chat room created",
//                    SenderId = Convert.ToInt32(userId),
//                    SendingTypeId = 9,
//                    Created = DateTime.Now,
//                });
//                _dbContext.SaveChanges();

//                // L?y danh sách chat box c?p nh?t và g?i ð?n client
//                var result = event__ChatRoomList_Update(Convert.ToInt32(userId));
//                await _hubContext.Clients.Group(from).SendAsync("RoomBrowser_Update", result);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error in AddChatRoom: {ex.Message}");
//                throw;
//            }
//        }

//        public Task ChangeChatBox()
//        {
//            throw new NotImplementedException();
//        }

//        public Task ChangeChatBoxAvatar()
//        {
//            throw new NotImplementedException();
//        }

//        public Task ChangeChatBoxBackgroundTheme()
//        {
//            throw new NotImplementedException();
//        }

//        public Task ChangeChatBoxTheme()
//        {
//            throw new NotImplementedException();
//        }

//        public Task JoinChatRoom()
//        {
//            throw new NotImplementedException();
//        }

//        public Task LeaveChatRoom()
//        {
//            throw new NotImplementedException();
//        }

//        public Task PinMessage()
//        {
//            throw new NotImplementedException();
//        }

//        public Task ReactMessage()
//        {
//            throw new NotImplementedException();
//        }

//        public Task RecallMessage()
//        {
//            throw new NotImplementedException();
//        }

//        public Task SendMessage(string userId, string username, string message, string from, string to)
//        {
//            throw new NotImplementedException();
//        }

//        //-------------------Event-------------------
//        public async Task<JsonResult> event__ChatBoxInfo_Update(int chatBoxId, int accountId)
//        {
//            var chatBoxes_by_id = _chatBoxService.findByChatBoxId(chatBoxId);

//            //----HeaderInfo----
//            var representativeName = chatBoxes_by_id.ChatBoxType.Id == 3 || chatBoxes_by_id.ChatBoxType.Id == 4 || chatBoxes_by_id.ChatBoxType.Id == 5
//                    ? chatBoxes_by_id.ChatBoxMembers.FirstOrDefault(m => m.AccountId != accountId).Account.FullName
//                    : chatBoxes_by_id.ChatBoxName;
//            var representativeAvatar = _accountService.getAvatarList_ByIdList(
//                    chatBoxes_by_id.ChatBoxMembers.Select(m => m.AccountId).ToList()
//                );
//            var headerInfo = new
//            {
//                infoName = "headerInfo",
//                Name = representativeName,
//                avatar = representativeAvatar,
//                type = chatBoxes_by_id.ChatBoxType.TypeName
//            };

//            //----MemberInfo----
//            var memberList = chatBoxes_by_id.ChatBoxMembers.Select(x => new
//            {
//                id = x.AccountId,
//                name = x.Nickname ?? x.Account.Username,
//                avatar = _accountService.getAvatarById(x.AccountId)
//            }).ToList();
//            var memberInfo = new
//            {
//                infoName = "memberInfo",
//                members = memberList
//            };

//            //----AdditionalInfo----
//            var additionalInfo = new
//            {
//                infoName = "additionalInfo",
//                member_count = memberList.Count,
//                //event_count = 0 //The fuck is this?
//            };

//            //----MediaInfo----
//            var mediaList = chatBoxes_by_id.ChatBoxImagesVideos.Select(x => new
//            {
//                id = x.Id,
//                fileKey = x.FileKey,
//                senderId = x.Message.SenderId,
//                sendDate = x.Message.Created,
//            }).ToList();
//            var mediaInfo = new
//            {
//                infoName = "mediaInfo",
//                media_count = mediaList.Count,
//                medias = mediaList
//            };

//            //----FileInfo----
//            var fileList = (await Task.WhenAll(chatBoxes_by_id.ChatBoxFiles.Select(async x =>
//            {
//                long fileSizeInBytes = await _awsService.GetFileSizeUsingAttributesAsync(x.FileKey);
//                double fileSizeInMB = fileSizeInBytes / 1048576.0;

//                return new
//                {
//                    id = x.Id,
//                    fileKey = x.FileKey,
//                    senderId = x.Message.SenderId,
//                    sendDate = x.Message.Created,
//                    capacity = fileSizeInMB > 0.1
//                        ? Math.Round(fileSizeInMB, 1) + " MB"
//                        : Math.Round(fileSizeInBytes / 1024.0, 1) + " KB",
//                    fileExtension = x.FileExtension,
//                };
//            }))).ToList();
//            var fileInfo = new
//            {
//                infoName = "fileInfo",
//                file_count = fileList.Count,
//                files = fileList
//            };

//            //----LinkInfo----
//            var linkList = (await Task.WhenAll(
//                chatBoxes_by_id.ChatBoxLinks.Select(async x => new
//                {
//                    id = x.Id,
//                    root = new Uri(x.LinkUrl).Host,
//                    url = x.LinkUrl,
//                    linkData = await _openGraphService.GetOpenGraphDataAsync(x.LinkUrl),
//                    senderId = x.Message.SenderId,
//                    sendDate = x.Message.Created,
//                })
//            )).ToList();
//            var linkInfo = new
//            {
//                infoName = "linkInfo",
//                link_count = linkList.Count,
//                links = linkList
//            };

//            var result = new
//            {
//                headerInfo = headerInfo,
//                membersInfo = memberInfo,
//                additionalInfo = additionalInfo,
//                mediaInfo = mediaInfo,
//                fileInfo = fileInfo,
//                linkInfo = linkInfo,
//                securityInfo = "",
//                functionInfo = "",
//            };
//            //await _hubContext.Clients.Group(from).SendAsync("ChatBoxInfo_Update", result);
//            return new JsonResult(result);
//        }

//        // TASK C?A CU BÁCH : VI?T EVENT G?I V? data_storage, dataRoomDemo  

//        public JsonResult event__ChatRoomList_Update(int accountId)
//        {
//            var chatBoxes_by_member = _chatBoxService.findByMemberId(accountId);
//            List<object> result = new();
//            foreach (var chatBox in chatBoxes_by_member)
//            {
//                var chatBoxType = new
//                {
//                    id = chatBox.ChatBoxType.Id,
//                    name = chatBox.ChatBoxType.TypeName
//                };
//                var representativeAvatar = _accountService.getAvatarList_ByIdList(
//                    chatBox.ChatBoxMembers.Select(m => m.AccountId).ToList()
//                );
//                var memberCount = chatBox.ChatBoxMembers.Count;
//                var representativeName = chatBox.ChatBoxType.Id == 3 || chatBox.ChatBoxType.Id == 4 || chatBox.ChatBoxType.Id == 5
//                    ? chatBox.ChatBoxMembers.FirstOrDefault(m => m.AccountId != accountId).Account.FullName
//                    : chatBox.ChatBoxName;
//                var lastSeenMessageId = chatBox.ChatBoxMembers.Where(cbm => cbm.AccountId == accountId).FirstOrDefault()?.LastSeenMessageId;
//                var isSeen = lastSeenMessageId != null && (chatBox.Messages.OrderByDescending(m => m.Id).FirstOrDefault()?.Id == lastSeenMessageId);
//                var unseenMessageCount = chatBox.Messages.Count(m => !isSeen && m.SenderId != accountId);
//                var recentMessage = chatBox.Messages
//                    .OrderByDescending(m => m.Created)
//                    .Select(m => new
//                    {
//                        sender = new
//                        {
//                            id = m.Sender.Id,
//                            name = m.Sender.Username
//                        },
//                        messageTypeId = m.MessageTypeId,
//                        sendDate = m.Created,
//                        text = m.Text,
//                        log = m.Log ?? null,
//                        fileKey = string.Join(";",
//                            m.ChatBoxFiles.Select(f => f.FileKey)
//                            .Concat(m.ChatBoxImagesVideos.Select(iv => iv.FileKey)))
//                    })
//                    .FirstOrDefault();
//                var card = chatBox.ChatBoxCardsTaggings == null ? null : new
//                {
//                    id = chatBox.ChatBoxCardsTaggings.Select(x => x.ChatBoxCards.Id).FirstOrDefault(),
//                    title = chatBox.ChatBoxCardsTaggings.Select(x => x.ChatBoxCards.Title).FirstOrDefault(),
//                    color = chatBox.ChatBoxCardsTaggings.Select(x => x.ChatBoxCards.Color).FirstOrDefault()
//                };

//                result.Add(new
//                {
//                    id = chatBox.Id,
//                    chatBoxType,
//                    representativeAvatar,
//                    memberCount,
//                    representativeName,
//                    isSeen,
//                    unseenMessageCount,
//                    recentMessage,
//                    card
//                });
//            }
//            //await _hubContext.Clients.Group(from).SendAsync("ChatRoomList_Update", result);
//            return new JsonResult(result);
//        }

//        public Task event__MessageList_Update()
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
