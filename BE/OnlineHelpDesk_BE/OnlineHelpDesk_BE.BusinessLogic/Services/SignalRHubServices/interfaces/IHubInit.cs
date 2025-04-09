using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ScriptPalaverBE.Services.chat_services.interfaces
{
    public interface IHubInit
    {
        JsonResult event__FilesExtensionFilter_Recieve();
        JsonResult event__RoomFilterCategories_Recieve(int userid);
        Task event__AppSettings_Receive();
    }
}
