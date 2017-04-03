FROM microsoft/dotnet-framework:4.6.2

COPY . /bin/Debug
WORKDIR /app

 
ENTRYPOINT ["DockerConsoleApplication.exe"]
