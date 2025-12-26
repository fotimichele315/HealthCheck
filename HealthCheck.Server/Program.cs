global using HealthCheck.Server;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks().AddCheck("ICPM_01", new ICMPHealthCheck("www.ryadel.com",100)).AddCheck("ICPM_02", new ICMPHealthCheck("www.google.com",100)).AddCheck("ICPM_03", new ICMPHealthCheck($"www.{Guid.NewGuid()}.com",100));
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

app.UseHealthChecks(new PathString("/api/health"), new CustomHealthCheckOptions());
// Mappa controller API
app.MapControllers();

// Angular SPA
app.UseDefaultFiles();
app.MapStaticAssets();

// **Il fallback deve essere l'ultima cosa**
app.MapFallbackToFile("/index.html");

app.Run();