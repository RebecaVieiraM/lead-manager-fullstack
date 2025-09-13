using System;

namespace LeadManager.Api.Models
{
    public enum LeadStatus
    {
        Invited = 0,
        Accepted = 1,
        Declined = 2
    }

    public class Lead
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Suburb { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public LeadStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
