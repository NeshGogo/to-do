using Microsoft.EntityFrameworkCore;
using to_do_backend.Data;
using to_do_backend.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("ToDo"));
builder.Services.AddScoped<ITaskToDoRepository, TaskToDoRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt => { 
    opt.EnableAnnotations();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
}

app.UseCors(c => c.WithOrigins(["https://to-do-app.azurewebsites.net", "http://localhost:4200", "http://localhost:4000"]));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
