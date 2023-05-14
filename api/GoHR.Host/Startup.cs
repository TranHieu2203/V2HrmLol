using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CoreDAL.EntityFrameworkCore;
using CoreDAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using CoreDAL;
using CoreDAL.Repositories;
using ProfileDAL.EntityFrameworkCore;
using PayrollDAL.EntityFrameworkCore;
using ProfileDAL.Repositories;
using ProfileDAL;
using Common;
using AttendanceDAL.Repositories;
using AttendanceDAL;
using AttendanceDAL.EntityFrameworkCore;
using PayrollDAL.Repositories;
using PayrollDAL;
using Newtonsoft.Json;
using System.Linq;
using CoreDAL.Utilities;

namespace GoHR.Host
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment HostingEnvironment { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));
            // Config Migration CoreDAL
            TLAContext.isMigration = true;
            services.AddDbContext<CoreDbContext>(options =>
            {
                options.UseOracle(Configuration["connectionString"],
                    sqlOracleOptions =>
                    {
                        sqlOracleOptions.MigrationsAssembly("CoreDbContext");
                    });
            });
            services.AddDbContext<RefreshTokenContext>();

            services.AddDbContext<ProfileDbContext>(options =>
            {
                options.UseOracle(Configuration["connectionString"],
                    sqlOracleOptions =>
                    {
                        sqlOracleOptions.MigrationsAssembly("ProfileDbContext");
                    }).EnableSensitiveDataLogging();
            });


            services.AddDbContext<AttendanceDbContext>(options =>
            {
                options.UseOracle(Configuration["connectionString"],
                    sqlOracleOptions =>
                    {
                        sqlOracleOptions.MigrationsAssembly("ProfileDbContext");
                    }).EnableSensitiveDataLogging();
            });
            services.AddDbContext<PayrollDbContext>(options =>
            {
                options.UseOracle(Configuration["connectionString"],
                    sqlOracleOptions =>
                    {
                        sqlOracleOptions.MigrationsAssembly("ProfileDbContext");
                    }).EnableSensitiveDataLogging();
            });
            services.AddIdentity<SysUser, IdentityRole>(opts =>
            {
                opts.Password.RequiredUniqueChars = 0;
                opts.Password.RequireNonAlphanumeric = false;
            })

            .AddEntityFrameworkStores<CoreDbContext>()
            .AddEntityFrameworkStores<ProfileDbContext>()
            .AddEntityFrameworkStores<PayrollDbContext>()
            .AddEntityFrameworkStores<AttendanceDbContext>()
            .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddCookie(cfg => cfg.SlidingExpiration = true)

              .AddJwtBearer(jwtBearerOptions =>
              {
                  jwtBearerOptions.RequireHttpsMetadata = false;
                  jwtBearerOptions.SaveToken = true;
                  jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = Configuration["JwtToken:Issuer"],
                      ValidAudience = Configuration["JwtToken:Issuer"],
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtToken:SecretKey"]))
                  };
              });

            // Tannv:
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                      builder =>
                          builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true) // allow any origin
                            .AllowCredentials() // <==
                      /* <<< this is required for cookies to be set on 
                       * the client 
                       * - sets the 'Access-Control-Allow-Credentials' to true                      
                       */
                      );
            });

            //services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            // Add framework services.
            //services.AddSingleton<SubdomainRoute>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
           
            //services.AddNodeServices();

            // Register the Swagger generator, defining one or more Swagger 
            //Prevent automatically convert to UTC

            //services.AddMvc().AddJsonOptions(options =>
            //{
            //    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
            //    options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            //});

            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                c.CustomSchemaIds(type => type.ToString());
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "GoHR API",
                    Version = "v1",
                    Description = "APIs of GoHR",
                    TermsOfService = new Uri("https://gohr.vn/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Kỹ Thuật",
                        Email = "kythuat@gohr.vn",
                        Url = new Uri("https://gohr.vn/terms"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://gohr.vn"),
                    }
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                 });
                services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
                // Set the comments path for the Swagger JSON and UI.
                // var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                //var xmlPath = Path.Combine(basePath, "tlavietnam.xml");
                //c.IncludeXmlComments(xmlPath);
            });

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IRefreshTokenService, RefreshTokenService>();
            services.AddTransient<IProfileBusiness, ProfileBusiness>();
            services.AddTransient<IAttendanceBusiness, AttendanceBusiness>();
            services.AddTransient<IPayrollBusiness, PayrollBusiness>();

            //------ Environment Development ----------
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });

            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            loggerFactory.AddFile("Logs/log-{Date}.txt");
            app.UseStaticFiles();

            app.UseAuthentication();

            //Tannv: 
            app.UseCors("AllowOrigin");



            // Enable CORS
            //app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            //app.UseCors(builder =>
            //{
            //    builder
            //    .WithOrigins("http://*.core.vn")
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .AllowCredentials();
            //});
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                //{
                //    HotModuleReplacement = true,
                //    HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
                //});
                //app.UseMvc();
                //app.UseAuthentication();d

                app.UseSwagger(c =>
                {
                    c.RouteTemplate = "/swagger/{documentName}/swagger.json";
                    //c.PreSerializeFilters.Add((swagger, httpReq) =>
                    //{
                    //    swagger.Servers = new List<OpenApiServer> { new OpenApiServer { Url = $"{httpReq.Scheme}://{httpReq.Host.Value}" } };
                    //});
                });
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "GoHR API v1");


                });

               
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseMvc(routes =>
                {
                    routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
                    routes.MapRoute("Sitemap", "sitemap.xml", new { controller = "Home", action = "SitemapXml" });
                });
                app.UseExceptionHandler("/Home/Error");
            }
            //app.UseHttpsRedirection();
            //app.UseMvc();
        }

    }
}