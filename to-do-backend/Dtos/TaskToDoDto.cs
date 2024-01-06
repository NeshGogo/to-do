namespace to_do_backend.Dtos
{
    public class TaskToDoDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Done { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
