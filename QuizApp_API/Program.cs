using Microsoft.EntityFrameworkCore;
using QuizApp_API.Data;
using System.Text.Json.Serialization;

namespace QuizApp_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Cross-Origin Resource Sharing (CORS)
            // Uncomment this when attaching to front-end! <----------------------------------------------------------------
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("Default", policy =>
            //        policy
            //            .AllowAnyHeader()
            //            .AllowAnyMethod()
            //            .WithOrigins("frontend site", "frontend dev server") From Jerome - our react dev server is http://localhost:3000
            //            //example ("https://myfrontend.example", "http://localhost:5432")
            //    );
            //});

            // Connect to PostgreSQL
            var connectionString = builder.Configuration.GetConnectionString("Postgres")
                ?? throw new InvalidOperationException("Connection string 'Postgres' not found.");

            // Add DbContext
            // .UseSnakeCaseNamingConvention (from EFCore) auto-maps C# PascalCase to PostgreSQL snake_case
            //      (e.g., "Question" -> "question"; "ID" -> "id")
            builder.Services.AddDbContext<QuestionsDbContext>(options =>
                options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention());

            // Automatically use camelCase for JSON serialization
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
            });

            // Add Database Health Checks
            builder.Services.AddHealthChecks().AddNpgSql(connectionString);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Ensure database is created
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<QuestionsDbContext>();
                // dbContext.Database.EnsureDeleted();
                dbContext.Database.EnsureCreated();
            }

            app.UseHttpsRedirection();

            // Uncomment this when attaching to front-end! <----------------------------------------------------------------
            //app.UseCors("Default");

            app.UseAuthorization();

            app.MapControllers();

            // Health endpoints
            app.MapHealthChecks("/health");

            app.Run();
        }
    }
}