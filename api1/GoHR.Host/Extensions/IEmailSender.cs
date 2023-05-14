using System.Threading.Tasks;

namespace GoHR.Host.Extensions
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
