# Mastermind Game

# Сontents
- [Mastermind Game](#mastermind-game)
- [Сontents](#сontents)
- [About the game](#about-the-game)
- [Prerequisites](#prerequisites)
- [Build and Run Instructions](#build-and-run-instructions)
- [Deployment](#deployment)
- [Extensions](#extensions)
- [Future work](#future-work)
- [Design Process](#design-process)
- [Routes](#routes)
- [Project specifications](#project-specifications)
- [Technologies](#technologies)
- [Dependencies](#dependencies)

# About the game

Mastermind is a strategy game  where the player has to guess a set of numbers. 
At the start of the game the computer will randomly select a pattern of four different numbers from a total of 8 different numbers from 0 to 7
At the end of each guess, computer will provide one of the following response as feedback:
- The player had guess a correct number
- The player had guessed a correct number and its correct location
- The player’s guess was incorrect
 
There are 3 levels of game complexity:
- Easy Level: 4-digit number to guess, 10 attempts to guess, and 3 hints
- Medium Level: 4-digit number to guess, 7 attempts, and 2 hints available
- Hard Level: 4-digit number to guess, 12 attempts, and no hints

# Prerequisites

Install [Postgres](https://www.postgresql.org/download/)<br>
Create a new database: 
```
createdb DATABASE_NAME
```

Set up dotenv to enable user specific environment variables:  
```
npm i --save dotenv
echo ".env" >> .gitignore
touch .env
echo DATABASE_URL=postgres://`whoami`@localhost:5432/DATABASE_NAME >> .env
```

Example of <code>.env</code>:<br>
```
DATABASE_URL=postgres://aleksandr@localhost:5432/DATABASE_NAME
```

# Build and Run Instructions

Clone repository from github: 
```
git clone https://github.com/agusev/mastermind
```
Go to the application folder:
```
cd mastermind
```
Install dependencies: 
```
npm install
```
[Optional] migrate database ( already included in `postinstall` script )
```
npm run db:migrate
```
Run locally:
```
npm run start:dev
```
Open in browser (Google Chrome recommended): [localhost](http://localhost:3000)

# Deployment

Deployed to [Render](https://mastermind.onrender.com/auth)

# Extensions

- [x] Add support to give hints
- [x] Add a configurable “difficulty level” and adjust the number of numbers that are used
- [x] Change numbers into colored pegs, shapes, animals, etc
- [x] Keep track of scores
- [x] Time counter

# Future work

- [ ] Add levels with 3-digit and 5 digit codes
- [ ] Add a multiplayer mode
- [ ] Add a timer
- [ ] add a timer for each attempt

# Design Process
<ol>

<li>I started to develop this application with designing the game logic. This allowed me to understand the game core logic and define required entities.</li><br>

<img width="620" alt="logic" src="https://user-images.githubusercontent.com/47907411/210621068-633edcd3-62bf-4af0-946e-f493aca4dd1d.png">


<li>Then I drew layouts for every page. This helped me define what objects I will need to return to the client side.</li><br>

<img width="620" alt="wireframes" src="https://user-images.githubusercontent.com/47907411/211071400-561e22d2-dcd9-4587-be23-55ef1d721ea1.png">

<li>Then, I defined database tables and entities that I will use later.<br>

 ```
    Users
      - id: primary key, integer, auto-increment
      - username: string, not null
      - password: string, not null 
      - created_at: date, not null
  ```
  ```
    Games
      - id: primary key, integer, auto-increment
      - username: string, not null
      - total_attempts: string, not null 
      - remained_attempts: string, not null 
      - result: string, not null 
      - complexity: integer, not null 
      - finished_at: date, not null
  ```
  </li>
<li>To create the express application skeleton I used <code>express-generator</code>:<br>

```
npx express-generator mastermind --view=pug
cd mastermind
npm install
```
```
mastermind 
├── bin
├── public 
  ├── images
  ├── javascript
  ├── stylesheets
├── routes 
├── views 
  ├── private
  ├── public
```
</li>

<li>
To create the database skeleton I used <code>sequelize</code>:<br>

```
npm install --save sequelize
npm install --save sequelize-cli
npx sequelize init
```
```
mastermind 
├── config 
├── controllers 
├── migrations 
├── models
```
</li>

<li>
After having set the database, I created database schemas for <code>Users</code> and <code>Games</code> tables that would 
automatically migrate during th first run.

```
mastermind
├── migrations
  ├── Users.js
  ├── Games.js
```
</li>

<li>
The next step was to work on the authentification process.<br>
First, I created routes and database queries. I decided to used <code>express-session</code> 
to store information about the user.<br>

```
mastermind
├── controllers
  ├── users.js
├── routes
  ├── auth.js
```

The configuration of the session is in <code>config/session.js</code><br>
To verify that user logged in, I added a verification middleware to <code>app.js</code>:<br>

```
app.use('/', protect, indexRouter);
```

```
mastermind
├── config
  ├── protect.js
  ├── session.js
```

Finally, I added a view and styles for front-end.<br>

```
mastermind
├── public
  ├── stylesheets
    ├── style.css
├── views
  ├── public
    ├── auth.pug
    ├── header.pug
    ├── footer.pug
    ├── layout.pug
```

For testing the application I used Mocha and Chai. I verified that user can 
register and login. 
Moreover, I tested that the login/register forms are rendered.<br>

```
mastermind
├── test
  ├── auth.test.js
```

```
  Auth page
    GET /auth
      ✔ returns 200 
      ✔ login form rendered
      ✔ register form rendered 
    register
      POST /auth/register
        ✔ should return user id
    login
      POST /auth/login
        ✔ should return id if user exists
```
</li>

<li>
The next step was to create a home page, where a player could configure and start the game, read rules.<br>
I created a protected route for the home page:<br>
<code>app.use('/', protect, indexRouter);</code>
Then, I added views and styles:<br>

```
mastermind
├── routes
  ├── index.js
├── public
  ├── stylesheets
    ├── style.css
├── views
  ├── private
    ├── header.pug
    ├── footer.pug
    ├── index.pug
    ├── layout.pug
    ├── rules.pug
```

</li>

<li>
Before creating a game page, I decided to add game logic that would 
initiate the game object and check win conditions after each move.

```
mastermind
├── game-logic
  ├── initialize.js
  ├── checkGameStatus.js
  ├── feedback.js
  ├── getCode.js
  ├── hints.js
```
First, the code will be generated in <code>game-logic/getCode.js</code> using <code>https://www.random.org/</code> API<br>

When the game is generated in the <code>game-logic/initialize.js</code>, a new game object will be returned with the folloing data:<br>

```
{
  gameData: {
    totalAttempts: 10,
    complexity: '0',
    hints: 3,
    numberOfPlayers: 1,
    current: 0,
    remainedGuesses: 10,
    codeLen: 4,
    status: 'In Progress',
    style: '0',
    timer: 180,
    array: [
      '0', '1', '2',
      '3', '4', '5',
      '6', '7'
    ],
    date: 1673116760420
  }
}
```

After each move, guess, feedback and hint arrays will be updated accordinngly.<br>
<code>game-logic/checkGameStatus.js</code> contains win conditions and will 
update game status after each move.<br>

Finally, I added tests for the game logic:<br>

```
mastermind
├── test
  ├── gamelogic.test.js
```
```
GAME LOGIC
    initiate.js
      ✔ should initiate an easy game
    getCode.js
      ✔ should retrieve a secret code
    checkGameStatus.js
      ✔ should return a correct game status
    feedback.js
      ✔ should return a correct feedback array
    hints.js
      ✔ should return a correct hint digit
```


</li>
</ol>

# Routes

| Description | API Endpoint |
| :---       | :---:        |
| Register a new user | POST /auth/register <br>Body {username, password} |
| Login | POST /auth/login <br>Body {username, password} |
| Logout a new user | POST  /auth/logout <br>deletes user data from session |
| Get home page | GET / <br>uses game data from session |
| Get game history page | GET /history <br>uses game data from session |
| Get game page | GET  /game <br>uses game data from session |
| Start a new game | POST /game/start <br>uses game data from session |
| Make a move | POST /game <br>uses game data from session |
| Finish game | POST /game/finish <br>uses game data from session |
                       

# Project specifications
- Create an account
- Sign in
- Retrieve list of public games
- Save a finished game
- Create a new game
- Play mastermind

# Technologies
- NodeJS
- Express
- PostgreSQL
- pg-promises
- Sequelize
- Pug

# Dependencies
```
mastermind 
├── axios@1.2.2 
├── bcrypt@5.1.0 
├── cookie-parser@1.4.6 
├── debug@2.6.9 
├── dotenv@16.0.3 
├── express-session@1.17.3 
├── express@4.18.2 
├── http-errors@1.6.3 
├── mocha@10.2.0 
├── morgan@1.9.1 
├── nodemon@2.0.20 
├── pg-promise@10.15.4 
├── prompt@1.3.0 
├── pug@3.0.2 
├── sequelize-cli@6.5.2 
└── sequelize@6.28.0 
```


