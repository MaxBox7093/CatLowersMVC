namespace CatLowersAPI.Models
{
    public class Registration
    {
        public string? FullName { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }
        public string? City { get; set; }
        public DateOnly? DateOfBirth { get; set; } 
    }
}
