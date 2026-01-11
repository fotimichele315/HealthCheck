global using HealthCheck.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks().AddCheck("ICPM_01", new ICMPHealthCheck("www.ryadel.com",100)).AddCheck("ICPM_02", new ICMPHealthCheck("www.google.com",100)).AddCheck("ICPM_03", new ICMPHealthCheck($"www.{Guid.NewGuid()}.com",100));
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument(); // NSwag
builder.Services.AddCors(options => options.AddPolicy(name:"AngularPolicy", cfg =>
{
    cfg.AllowAnyHeader();
    cfg.AllowAnyMethod();
    cfg.WithOrigins(builder.Configuration["AllowedCORS"]!); 
}));
var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AngularPolicy");
// Solo in Development
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();        // JSON OpenAPI
    app.UseSwaggerUi();     // UI interattiva
}

app.UseHealthChecks(new PathString("/api/health"), new CustomHealthCheckOptions());
// Mappa controller API
app.MapControllers();
app.MapGet("/api/hearthbeat", () => Results.Ok("alive"));
// Angular SPA
app.UseDefaultFiles();
app.MapStaticAssets();

// **Il fallback deve essere l'ultima cosa**
app.MapFallbackToFile("/index.html");

app.Run();