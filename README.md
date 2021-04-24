# jokes-catalogue
## Author: Abhijit Baldawa

### Description
A fullstack Node.js/React.js/Typescript application with jokes catalogue along with interesting metrics.

### Tech Stack
1. Backend: Node.js (14.x)/Typescript and express.js
2. Front end: React.js/Typescript
3. Docker

### How to run:
1. git clone https://github.com/abaldawa/jokes-catalogue.git
2. cd jokes-catalogue
3. IMPORTANT: Open docker-compose.yml file and for env variable JOKE_API_HEADERS for key "x-jokesone-api-secret" replace empty string ("") with valid API key for service https://api.jokes.one/
3. docker-compose up
4. go to http://localhost:3000 to see the UI

### Server REST API:
1. `GET /joke?noOfJokes=<number>` -> Responds with jokes and metrics of all the jokes

### User interface
Below gif shows how the UI looks like.

![jokes-catalogue-output](https://user-images.githubusercontent.com/5449692/115958637-82571a80-a508-11eb-8d3f-c0983f0b805e.gif)