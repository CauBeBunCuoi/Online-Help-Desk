
//using Microsoft.AspNetCore.SignalR;
//using ScriptPalaverBE.Data;
//using ScriptPalaverBE.Services.chat_services;
//using ScriptPalaverBE.Services.chat_services.interfaces;
//using ScriptPalaverBE.Services.db_services.interfaces;

//public class HubNotificationService : IHubNotification
//{
//    private readonly ScriptPalaverDbContext _dbContext;
//    private readonly IHubContext<ChatHub> _hubContext;
//    private readonly IChatbox _chatBoxService;
//    private readonly IMessage _messageService;
//    private readonly IAccount _accountService;

//    public HubNotificationService(
//        ScriptPalaverDbContext dbContext,
//        IChatbox chatBoxService,
//        IHubContext<ChatHub> hubContext,
//        IMessage messageService,
//        IAccount accountService
//        )
//    {
//        _dbContext = dbContext;
//        _chatBoxService = chatBoxService;
//        _hubContext = hubContext;
//        _messageService = messageService;
//        _accountService = accountService;
//    }
//    public async Task SendNotification(string notification)
//    {
//        await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
//    }
//}