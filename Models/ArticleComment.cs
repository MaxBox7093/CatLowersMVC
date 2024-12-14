namespace CatLowersMVC.Models
{
    public class ArticleComment
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public string Text { get; set; }
    }
}
