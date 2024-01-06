using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using to_do_backend.Data.Repositories;
using to_do_backend.Dtos;
using to_do_backend.Entities;

namespace to_do_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksToDoController : ControllerBase
    {
        private readonly ITaskToDoRepository _repo;
        private readonly IMapper _mapper;

        public TasksToDoController(ITaskToDoRepository repository, IMapper mapper)
        {
            _repo = repository;
            _mapper = mapper;
        }

        [SwaggerOperation(
            summary: "Get all tasks",
            description: "User should be login",
            OperationId = "Tasks",
            Tags = ["Tasks"]
            )]
        [HttpGet]
        public ActionResult<IEnumerable<TaskToDoDto>> Get()
        {
            var results = _repo.GetAll();
            return _mapper.Map<List<TaskToDoDto>>(results);
        }

        [SwaggerOperation(
           summary: "Get a task",
           description: "User should be login",
           OperationId = "Tasks",
           Tags = ["Tasks"]
           )]
        [HttpGet("{id}", Name =  "GetTaskById")]
        public ActionResult<TaskToDoDto> GetTaskById(string id)
        {
            var result = _repo.GetById(Guid.Parse(id));
            return _mapper.Map<TaskToDoDto>(result);
        }

        [SwaggerOperation(
           summary: "Add a new task",
           description: "User should be login",
           OperationId = "Tasks",
           Tags = ["Tasks"]
           )]
        [HttpPost()]
        public async Task<ActionResult<TaskToDoDto>> Post([FromBody] TaskToDoCreateDto createDto)
        {
            var entity = _mapper.Map<TaskToDo>(createDto);
            entity.CreatedDate = DateTime.Now;
            entity.UpdatedDate = DateTime.Now;
            entity.CreatedBy = "System";
            entity.UpdatedBy = "System";
            _repo.insert(entity);
            await _repo.SaveChangesAsync();
            var dto = _mapper.Map<TaskToDoDto>(entity);
            return CreatedAtRoute("GetTaskById", new { id = entity.Id }, dto);
        }

        [SwaggerOperation(
           summary: "Update a task",
           description: "User should be login",
           OperationId = "Tasks",
           Tags = ["Tasks"]
           )]
        [HttpPut("{id}")]
        public async Task<ActionResult<TaskToDoDto>> Put(string id, [FromBody] TaskToDoCreateDto createDto)
        {
            var entity = _repo.GetById(Guid.Parse(id));
            if (entity == null) return NotFound($"Couldn't find the task with id: {id}");
            _mapper.Map(createDto, entity);
            entity.UpdatedDate = DateTime.Now;
            entity.UpdatedBy = "System";
            _repo.Update(entity);
            await _repo.SaveChangesAsync();
            var dto = _mapper.Map<TaskToDoDto>(entity);
            return dto;
        }

        [SwaggerOperation(
           summary: "Delete a task",
           description: "User should be login",
           OperationId = "Tasks",
           Tags = ["Tasks"]
           )]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var entity = _repo.GetById(Guid.Parse(id));
            if (entity == null) return NotFound($"Couldn't find the task with id: {id}");
            _repo.Delete(entity);
            await _repo.SaveChangesAsync();
            return NoContent();
        }
    }
}
