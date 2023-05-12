using BACKEND.Entities.DTO.DataDto.DTSU666;
using BACKEND.Entities.DTO.DataDto.PZEM017;
using BACKEND.Extensions.Data_Ex.DataShaping_DTSU666;
using BACKEND.Extensions.Service.ActionFilters;
using BACKEND.Extensions.Service.Error;
using BACKEND.Extensions.Service.LoggerService;
using BACKEND.Extensions.Service.Mapping;
using BACKEND.Extensions.Service.MongDb;
using BACKEND.Extensions.Service.Static;
using BACKEND.Interface.IData.IDTSU666;
using BACKEND.Interface.IData.IDTSU666.Interface_Shapping_DTSU666;
using BACKEND.Interface.IData.IPZEM017;
using BACKEND.Interface.IService.ILoggerService;
using BACKEND.Repository.Data_Re;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NLog;
using System.IO;
using System.Net;

namespace BACKEND
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            //LOGGER_config
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //----------------------------------------------------Services-------------------------------------
            
            //CORS
            services.ConfigureCors();

            //IIS
            services.ConfigureIISIntegration();


            //LOGGER_SERVICE
            services.AddScoped<ILoggerService, LoggerService>();

            // Mapping 
            services.AddAutoMapper(typeof(MappingProfile));

            //ConnectMongoDbClient
            services.ConfigureMongoDbClient(Configuration);
            //

            // Service PROXY
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.KnownProxies.Add(IPAddress.Parse("127.0.0.1"));
            });



            //----------------------------------------------------Data-------------------------------------

            //------------------------------DTSU666----------------------
            services.AddSingleton<IDTSU666_Repository, DTSU666_Repository>();

            //------------DataShaping DTSU666----------------
            services.AddScoped<IDataShaper<DTSU666_Get_Dto>, DataShaper<DTSU666_Get_Dto>>();



            //------------------------------PZEM017-----------------------
            services.AddSingleton<IPZEM017_Repository, PZEM017_Repository>();


            //------------DataShaping PZEM017---------------------------
            services.AddScoped<IDataShaper<PZEM017_Get_Dto>, DataShaper<PZEM017_Get_Dto>>();


            // BỘ LỌC___Dùng cho phương thức Get_ID
            services.AddScoped<AsyncActionFilter>();

            // BỘ LỌC___Dùng cho phương thức Post,Put
            services.AddScoped<ValidationFilter>();

            // VALIDATION___Model State
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });




            //----------------------------------------------------User-------------------------------------




            services.AddControllers();

            // CHO PHÉP CHỨA HẬU TỐ ASYNC 
            services.AddControllers(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;

            });

            //SWAGGER
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BACKEND", Version = "v1" });
            });
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerService logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BACKEND v1"));
            }
            // HSTS_____ adds Strict-Transport-Security header
            else
            {
                app.UseHsts();
            }

            // ExceptionsHandling
            app.ConfigureExceptionHandler(logger);

            if (env.IsDevelopment()) // Cho phép chuyển hướng https nếu đây là chế độ development
            {
                app.UseHttpsRedirection();
            }


            app.UseStaticFiles();


            //CORS
            app.UseCors("CorsPolicy");

            //// CHUYỂN TIẾP TIÊU ĐÈ PROXY ĐẾN YÊU CẦU HIỆN TẠI 
            //app.UseForwardedHeaders(new ForwardedHeadersOptions
            //{
            //    ForwardedHeaders = ForwardedHeaders.All
            //});
        
            app.UseRouting();

            //// CHUYỂN TIẾP TIÊU ĐÈ PROXY ĐẾN YÊU CẦU HIỆN TẠI 
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });


            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
