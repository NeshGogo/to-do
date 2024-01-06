using AutoMapper;
using to_do_backend.Dtos;
using to_do_backend.Entities;

namespace to_do_backend.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TaskToDo, TaskToDoDto>().ReverseMap();
            CreateMap<TaskToDoCreateDto, TaskToDo>();
        }
    }
}
