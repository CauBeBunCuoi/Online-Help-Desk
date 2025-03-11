using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ScriptPalaverBE.Services.chat_services.interfaces
{
    public interface IHubChatBox
    {

        // Nháp Functions
        Task AddChatRoom_nhap(string userId, string from);

        // Main Functions
        Task AddChatRoom(string userId, string from);
        Task ChangeChatBox();
        Task SendMessage(string userId, string username, string message, string from, string to);
        Task AddChatBoxCard();
        Task AddChatBoxCardTagging();
        Task ReactMessage();
        Task PinMessage();
        Task RecallMessage();
        Task JoinChatRoom();
        Task LeaveChatRoom();
        Task ChangeChatBoxTheme();
        Task ChangeChatBoxBackgroundTheme();
        Task ChangeChatBoxAvatar();

        // Events Functions
        Task event__MessageList_Update();
        Task<JsonResult> event__ChatBoxInfo_Update(int chatBoxId, int accountId);
        JsonResult event__ChatRoomList_Update(int accountId);








    }
}
