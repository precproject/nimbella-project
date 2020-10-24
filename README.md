** Project Structure **

Angular Product Build - /src/web
NodeJS Backend API - /src/packages/foodtrack-node
Java Backend API - /src/packages/default


Nimbella Project Configuration - /src/project.yml

GitHub CI/CD - .github/workflows

Angular Development Project - /foodtrackapp

** Commands Nimbella **

1. Deploy Nimbella Project
    nim project deploy src --env src/.env
2. Create .env file with key-value pair credentials (Database)
    username=***
    password=***
    database=***

3. nim action list
4. nim action invoke foodtrack-node/test
5. nim activation get
6. nim action get foodtrack-node/test --url
7. nim --help
8. nim action list
9. nim action update foodtrack-node/test -t 10000

** Commands Git **

3. git pull
4. git status
5. git add .
6. git commit -m "Commit Message"
7. git push origin master

** Commands Angular **

8. cd /foodtrackapp
9. npm install
10. ng serve
11. ng build --prod
