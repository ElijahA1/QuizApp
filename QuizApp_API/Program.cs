using Microsoft.EntityFrameworkCore;
using QuizApp_API.Data;


namespace QuizApp_API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Cross-Origin Resource Sharing (CORS)
            // Uncomment this when attaching to front-end! <----------------------------------------------------------------
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Default", policy =>
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000")
                    //example ("https://myfrontend.example", "http://localhost:5432")
                    );
            });

            // Connect to PostgreSQL or throw exception if it cannot be found
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
                dbContext.Database.EnsureCreated();
            }

            // app.UseHttpsRedirection(); Testing LAN 

            // Uncomment this when attaching to front-end! <----------------------------------------------------------------
            app.UseCors("Default");

            #region Middleware for API key
            var apiKey = app.Configuration["ApiKey"]; // Read "ApiKey" from environment variable

            // Show warning if API key is missing
            if (string.IsNullOrWhiteSpace(apiKey))
            {
                app.Logger.LogWarning("No API key configured in environment variable 'ApiKey'. Only read requests will work.");
            }

            app.Use(async (context, next) => // Register middleware that runs on every HTTP request
            {
                // Allow all GET methods to remain public
                if (HttpMethods.IsGet(context.Request.Method)) // If the request method is GET
                {
                    await next();  // Skip the API key check
                    return;        // Skip the rest of the code block
                }

                const string headerName = "X-API-KEY"; // The header name clients must use to send the API key

                // Try to read the key from the request. Prefer header; fall back to query string for convenience.
                string? providedKey = context.Request.Headers[headerName].FirstOrDefault(); // curl should include: -H "X-API-KEY: API_KEY" (example with fake key: -H "X-API-KEY: z84a0W8ru"

                // Reject write requests if the server has no configured key or the provided key doesn't match
                if (string.IsNullOrWhiteSpace(apiKey) ||                              // No configured key on the server?
                    !string.Equals(providedKey, apiKey, StringComparison.Ordinal))    // Compare provided key with API key (StringComparison.Ordinal ensures it is an exact match)
                {
                    // Send unauthorized status code and response
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("API key is invalid or missing.");
                    return; // Skip the rest of the code block
                }

                await next(); // Key is valid ? continue to the next middleware/your controller action.
            });
            #endregion

            app.UseAuthorization();

            app.MapControllers();

            // Health endpoints
            app.MapHealthChecks("/health");

            app.Run();
        }
    }
}