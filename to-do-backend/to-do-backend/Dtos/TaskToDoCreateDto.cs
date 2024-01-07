using System.ComponentModel.DataAnnotations;

namespace to_do_backend.Dtos
{
    public class TaskToDoCreateDto
    {
        [Required]
        public string Title { get; set; }
        public bool Done { get; set; }
    }
}
