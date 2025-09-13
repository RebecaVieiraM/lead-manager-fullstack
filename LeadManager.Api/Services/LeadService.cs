using LeadManager.Api.Data;
using LeadManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeadManager.Api.Services
{
    public class LeadService
    {
        private readonly LeadContext _context;
        private readonly IEmailService _emailService;

        public LeadService(LeadContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<List<Lead>> GetAllLeadsAsync()
        {
            return await _context.Leads.ToListAsync();
        }

        public async Task<Lead?> AcceptLeadAsync(int id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null) return null;

            if (lead.Price > 500) lead.Price *= 0.9m; // aplica desconto
            lead.Status = LeadStatus.Accepted;
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(
                "vendas@test.com",
                "Lead aceito",
                $"Lead {lead.FirstName} {lead.LastName} aceito com preço {lead.Price:C}"
            );

            return lead; // retorna lead atualizado
        }
        public async Task<bool> DeclineLeadAsync(int id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null) return false;

            lead.Status = LeadStatus.Declined;
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(
                "vendas@test.com",
                "Lead recusado",
                $"Lead {lead.FirstName} {lead.LastName} foi recusado."
            );

            return true;
        }

        public void AddLead(Lead lead)
        {
            _context.Leads.Add(lead);
            _context.SaveChanges();
        }

    }
}
