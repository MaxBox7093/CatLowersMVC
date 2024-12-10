namespace CatLowersMVC.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int IdCategory { get; set; }
        public int IdUser { get; set; }
        public string Text { get; set; }
        public string Tags { get; set; }
    }
}
