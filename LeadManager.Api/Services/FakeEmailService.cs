using System;
using System.Threading.Tasks;

namespace LeadManager.Api.Services
{
    public class FakeEmailService : IEmailService
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            Console.WriteLine($"[E-mail fake] Para: {to}, Assunto: {subject}, Corpo: {body}");
            return Task.CompletedTask;
        }
    }
}
