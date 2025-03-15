using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ScriptPalaverBE.Services.chat_services.interfaces
{
    public interface IHubNotification
    {

        Task SendNotification(string notification);

    }
}
