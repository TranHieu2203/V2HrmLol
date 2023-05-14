#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
COPY ["AttendanceAPI/AttendanceAPI.csproj", "AttendanceAPI/"]
COPY ["AttendanceDAL/AttendanceDAL.csproj", "AttendanceDAL/"]
COPY ["Common/Common.csproj", "Common/"]
COPY ["CoreAPI/CoreAPI.csproj", "CoreAPI/"]
COPY ["GoHR.Core/CoreDAL.csproj", "GoHR.Core/"]
COPY ["ProfileDAL/ProfileDAL.csproj", "ProfileDAL/"]
COPY ["PayrollAPI/PayrollAPI.csproj", "PayrollAPI/"]
COPY ["PayrollDAL/PayrollDAL.csproj", "PayrollDAL/"]
COPY ["ProfileAPI/ProfileAPI.csproj", "ProfileAPI/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]