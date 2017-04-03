FROM microsoft/dotnet:latest
COPY . /app
WORKDIR /app
 
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
 
EXPOSE 5002/tcp

ENV ASPNETCORE_URLS http://*:5002
 
ENTRYPOINT ["dotnet", "run"]
