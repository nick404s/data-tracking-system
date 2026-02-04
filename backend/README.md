https://fastapi.tiangolo.com/deployment/docker/

Install Docker

Run the following command from inside the backend folder:

to rebuild and deploy: `docker-compose up -d --no-deps --build `

deploy only: `docker-compose up`








OLD Instructions
1. `docker build -t myimage .`

2. `docker run -d --name mycontainer -p 80:80 myimage`
