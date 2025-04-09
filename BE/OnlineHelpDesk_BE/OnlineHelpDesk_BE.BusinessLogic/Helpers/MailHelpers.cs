using OnlineHelpDesk_BE.Common.AppConfigurations.Mail.interfaces;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace OnlineHelpDesk_BE.BusinessLogic.Helpers
{
    public class MailHelpers
    {
        private readonly IMailConfig _mailConfig;
        private readonly IRazorViewEngine _viewEngine;
        private readonly ITempDataProvider _tempDataProvider;
        private readonly IServiceProvider _serviceProvider;
        

        public MailHelpers(
            IMailConfig mailConfig,
            IRazorViewEngine viewEngine,
            ITempDataProvider tempDataProvider,
            IServiceProvider serviceProvider)
        {
            _mailConfig = mailConfig;
            _viewEngine = viewEngine;
            _tempDataProvider = tempDataProvider;
            _serviceProvider = serviceProvider;
        }

        public async Task<string> RenderViewToStringAsync(string viewPath, dynamic viewData)
        {
            var httpContext = new DefaultHttpContext { RequestServices = _serviceProvider };
            var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());

            await using var sw = new StringWriter();
            var viewResult = _viewEngine.FindView(actionContext, viewPath, false);

            if (!viewResult.Success)
            {
                throw new FileNotFoundException($"View '{viewPath}' không tìm thấy.");
            }

            var viewDictionary = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
            {
                Model = viewData
            };

            var viewContext = new ViewContext(
                actionContext,
                viewResult.View,
                viewDictionary,
                new TempDataDictionary(httpContext, _tempDataProvider),
                sw,
                new HtmlHelperOptions()
            );

            await viewResult.View.RenderAsync(viewContext);
            return sw.ToString();
        }

        public async Task SendEmailAsync(string toEmail, string subject, string viewPath, dynamic viewData)
        {
            // Render Razor view to HTML string
            string htmlBody = await RenderViewToStringAsync(viewPath, viewData);

            using var client = new SmtpClient(_mailConfig.SmtpHost, _mailConfig.SmtpPort)
            {
                EnableSsl = _mailConfig.EnableSsl,
                Credentials = new NetworkCredential(_mailConfig.FromEmail, _mailConfig.SmtpPassword)
            };

            var mail = new MailMessage
            {
                From = new MailAddress(_mailConfig.FromEmail, _mailConfig.FromName),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };

            mail.To.Add(toEmail);

            await client.SendMailAsync(mail);
        }



    }
}
