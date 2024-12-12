namespace CatLowersMVC.Models
{
    public class Question
    {
        public int? Id { get; set; }
        public int? IdUser { get; set; }
        public int? IdTopic { get; set; }
        public string? TopicName { get; set; }
        public string? Title { get; set; }
        public string? Text { get; set; }
        public byte[]? Img { get; set; }
    }

}
