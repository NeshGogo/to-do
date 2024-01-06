using Microsoft.EntityFrameworkCore;
using to_do_backend.Entities;

namespace to_do_backend.Data.Repositories
{
    public class TaskToDoRepository : ITaskToDoRepository
    {
        private readonly AppDbContext _context;

        public TaskToDoRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Delete(TaskToDo entity)
        {
            _context.Set<TaskToDo>().Remove(entity);
        }

        public IEnumerable<TaskToDo> GetAll()
        {
            return _context.Set<TaskToDo>().AsNoTracking();
        }

        public TaskToDo? GetById(Guid id)
        {
            return _context.Set<TaskToDo>().FirstOrDefault(p => p.Id ==  id);
        }

        public void insert(TaskToDo entity)
        {
            _context.Set<TaskToDo>().Add(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > -1;
        }

        public void Update(TaskToDo entity)
        {
            _context.Set<TaskToDo>().Update(entity);
        }
    }
}
