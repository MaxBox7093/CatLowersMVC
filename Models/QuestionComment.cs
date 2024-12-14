namespace CatLowersMVC.Models
{
    public class QuestionComment
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public string Text { get; set; }
    }
}
