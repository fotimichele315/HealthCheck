using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument(); // NSwag

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

// Solo in Development
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();        // JSON OpenAPI
    app.UseSwaggerUi();     // UI interattiva
}

// Mappa controller API
app.MapControllers();

// Angular SPA
app.UseDefaultFiles();
app.MapStaticAssets();

// **Il fallback deve essere l'ultima cosa**
app.MapFallbackToFile("/index.html");

app.Run();