using LeadManager.Api.Models;
using LeadManager.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LeadManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadsController : ControllerBase
    {
        private readonly LeadService _leadService;

        public LeadsController(LeadService leadService)
        {
            _leadService = leadService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLeads()
        {
            var leads = await _leadService.GetAllLeadsAsync();
            return Ok(leads);
        }

        [HttpPut("{id}/accept")]
        public async Task<IActionResult> AcceptLead(int id)
        {
            var lead = await _leadService.AcceptLeadAsync(id);
            if (lead == null) return NotFound();
            return Ok(lead); // retorna lead atualizado
        }


        [HttpPut("{id}/decline")]
        public async Task<IActionResult> DeclineLead(int id)
        {
            var result = await _leadService.DeclineLeadAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddLead([FromBody] Lead lead)
        {
            if (lead == null)
                return BadRequest();

            lead.Status = LeadStatus.Invited;
            lead.CreatedAt = DateTime.Now;

            _leadService.AddLead(lead); // vamos adicionar método no LeadService
            return CreatedAtAction(nameof(GetAllLeads), new { id = lead.Id }, lead);
        }

    }
}
