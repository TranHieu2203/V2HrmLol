using System.Threading.Tasks;

namespace CoreDAL.Common
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
