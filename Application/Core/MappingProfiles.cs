using AutoMapper;
using Domain;

namespace Application.Core
{
    // AutoMapper is a library in .Net application that simplifies the process of mapping object. It automatically copies data from one object to another when the object have similar properties.   
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}