FROM mono

COPY /bin/Debug/ /app
WORKDIR /app

 
ENTRYPOINT ["mono" , "DockerConsoleApplication.exe"]
