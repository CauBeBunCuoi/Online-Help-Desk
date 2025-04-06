# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# USER app
# WORKDIR /app

# EXPOSE 8001

# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# ARG BUILD_CONFIGURATION=Release
# WORKDIR /src
# COPY OnlineHelpDesk_BE.API.csproj ./OnlineHelpDesk_BE.API.csproj
# RUN dotnet restore "./OnlineHelpDesk_BE.API.csproj"
# COPY . .
# WORKDIR "/src"
# RUN dotnet build "./OnlineHelpDesk_BE.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# FROM build AS publish
# ARG BUILD_CONFIGURATION=Release
# RUN dotnet publish "./OnlineHelpDesk_BE.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "OnlineHelpDesk_BE.API.dll"]



FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app

EXPOSE 8002


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# COPY ["OnlineHelpDesk_BE.API/OnlineHelpDesk_BE.API.csproj", "API/"]
# COPY ["OnlineHelpDesk_BE.BusinessLogic/OnlineHelpDesk_BE.BusinessLogic.csproj", "BusinessLogic/"]
# COPY ["OnlineHelpDesk_BE.DataAccess/OnlineHelpDesk_BE.DataAccess.csproj", "DataAccess/"]
# COPY ["OnlineHelpDesk_BE.Common/OnlineHelpDesk_BE.Common.csproj", "Common/"]

COPY OnlineHelpDesk_BE.API/ ./API/
COPY OnlineHelpDesk_BE.BusinessLogic/ ./BusinessLogic/
COPY OnlineHelpDesk_BE.Common/ ./Common/
COPY OnlineHelpDesk_BE.DataAccess/ ./DataAccess/

# Khôi phục dependencies
RUN dotnet restore "API/OnlineHelpDesk_BE.API.csproj"
# RUN dotnet restore "BusinessLogic/OnlineHelpDesk_BE.BusinessLogic.csproj"
# RUN dotnet restore "DataAccess/OnlineHelpDesk_BE.DataAccess.csproj"
# RUN dotnet restore "Common/OnlineHelpDesk_BE.Common.csproj"




# Sao chép toàn bộ mã nguồn
COPY . . 
# RUN dotnet build "OnlineHelpDesk_BE.API.csproj" -c $BUILD_CONFIGURATION -o /app/build
WORKDIR /src/API
RUN dotnet build "OnlineHelpDesk_BE.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish "OnlineHelpDesk_BE.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OnlineHelpDesk_BE.API.dll"]