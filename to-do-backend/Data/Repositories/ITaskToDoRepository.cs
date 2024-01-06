using to_do_backend.Entities;

namespace to_do_backend.Data.Repositories
{
    public interface ITaskToDoRepository
    {
        IEnumerable<TaskToDo> GetAll();
        TaskToDo? GetById(Guid id);
        void Update(TaskToDo entity);
        void insert(TaskToDo entity);
        void Delete(TaskToDo entity);
        Task<bool> SaveChangesAsync();
    }
}
