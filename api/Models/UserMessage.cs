namespace api.Models
{
    public class UserMessage
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserText { get; set; }
    }
}