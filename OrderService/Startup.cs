using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using OrderService.DataProvider;
using OrderService.Application;

namespace OrderService
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //string dbName = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "192.168.99.100";
            //string dbPassword = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? "postgres";
            //string pgConStr = string.Format("Host={0};Port=5432;Database=myDataBase;User ID=postgres;Password={1}", dbName, dbPassword);
    

            services.AddDbContext<OrderServiceContext>(
                       options => options.UseNpgsql(Configuration["Data:ConnectionStrings:PostgreSQLConnectionString"], 
                       b => b.MigrationsAssembly("OrderService")));
 
            services.AddSingleton<IOrderServiceDataProvider, OrderServiceDataProvider>();
            services.AddTransient<IOrderApplicationService, OrderApplicationService>();
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();

            // Create DB on startup
            //using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            //{
              //  serviceScope.ServiceProvider.GetService<OrderServiceContext>().Database.Migrate();
            //}
        }
    }
}
