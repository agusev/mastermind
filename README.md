# Mastermind Game

# Сontents
- [Mastermind Game](#mastermind-game)
- [Сontents](#сontents)
- [About the game](#about-the-game)
- [Available scripts](#available-scripts)
- [Build and Run Instructions](#build-and-run-instructions)
- [Database setup](#database-setup)
- [Deployment](#deployment)
- [Extensions](#extensions)
- [Development Environment](#development-environment)
- [Design Process](#design-process)
- [Routes](#routes)
- [Project specifications](#project-specifications)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Challenges](#challenges)
- [Future work](#future-work)

# About the game

Mastermind is a strategy game where the player has to guess a set of numbers. 
At the start of the game the computer will randomly select a pattern of four different numbers from 0 to 7 for a total of 8 different numbers.
At the end of each guess, the computer will provide one of the following responses as feedback:
- The player had guessed a correct number
- The player had guessed a correct number and its correct location
- The player’s guess was incorrect
 
There are 3 levels of game complexity:
- Easy Level: 4-digit number to guess, 10 attempts, and 3 hints
- Medium Level: 4-digit number to guess, 7 attempts, and 2 hints
- Hard Level: 4-digit number to guess, 12 attempts, and no hints

# Available scripts

For the first run, follow these [instructions](#build-and-run-instructions)

---

Run locally on [localhost:3000](http://localhost:3000)

```
npm run start:dev
```
Run tests locally

```
npm run test
```

# Build and Run Instructions

<ol>
<li>Clone repository from GitHub: 

```
git clone https://github.com/agusev/mastermind
```

</li>
<li>Go to the application folder:

```
cd mastermind
```

</li>
<li>

[Setup PostgreSQL database](#build-and-run-instructions)

</li>

</li>
<li>
Install <a href="https://nodejs.org/en/" target="_blank">NodeJs</a>
</li>
<li>Install dependencies: 

```
npm install
```

</li>
<li>[Optional] migrate database ( already included in <code>postinstall</code> script )

```
npm run db:migrate
```

</li>
<li>Run locally:

```
npm run start:dev
```

</li>
<li>Open in browser (Google Chrome recommended): 

[localhost:3000](http://localhost:3000)
</li>

</ol>

# Database setup

Install [Postgres](https://www.postgresql.org/download/)<br>
Create a new database: 
```
createdb DATABASE_NAME
```

Set up dotenv to enable user-specific environment variables:  
```
npm i --save dotenv
echo ".env" >> .gitignore
touch .env
echo DATABASE_URL=postgres://`whoami`@localhost:5432/DATABASE_NAME >> .env
```

Example of <code>.env</code>:<br>
```
DATABASE_URL=postgres://aleksandr@localhost:5432/masterminddb
```


# Deployment
Deployed to <a href="https://mastermind.onrender.com" target="_blank">render.com</a>


<img width="620" alt="deployment" src="https://user-images.githubusercontent.com/47907411/211167123-fbae33a4-e0ce-440c-ae45-804a8d6471c1.png">

# Extensions

- [x] Add support to give hints
- [x] Add a configurable “difficulty level” and adjust the number of numbers that are used
- [x] Change numbers into colored pegs, shapes, animals, etc
- [x] Keep track of the scores
- [x] Time counter

# Development Environment

Visual Studio Code, iTerm, and Postman were used.

# Design Process
<ol>

<li>I started to develop this application with designing the game logic. This allowed me to understand the game core logic and define required entities. This took me 3 days before I started the implementation</li><br>

<img width="620" alt="logic" src="https://user-images.githubusercontent.com/47907411/210621068-633edcd3-62bf-4af0-946e-f493aca4dd1d.png">

When a user hits the start button, an instance of a game object is initiated with 
the following data structure:

`gameData` object contains game configurations including level, style, 
how many attempts, etc.
```
{
  totalAttempts: 7,
  complexity: '1',
  hints: 2,
  numberOfPlayers: 1,
  current: 0,
  status: 'In Progress'
  remainedGuesses: 7,
  codeLen: 4,
  style: '0',
  timer: 180,
  array: ['0', '1', '2', '3', '4', '5', '6', '7'],
  date: 1673239730119,
  code: '3427'
}
```

`Guesses array` is populated with negative values and is updated 
after each submission with the user's guesses.
```
[
  [ '4', '4', '5', '3' ],
  [ '1', '2', '4', '2' ],
  [ '4', '3', '4', '3' ],
  [ '2', '0', '3', '4' ],
  [ '7', '7', '1', '3' ],
  [ -1, -1, -1, -1 ],
  [ -1, -1, -1, -1 ],
  [ -1, -1, -1, -1 ],
  [ -1, -1, -1, -1 ],
  [ -1, -1, -1, -1 ]
]
```
`Feedback array` is populated with empty strings and updated after each turn.

```
[
  '2 correct numbers and 0 correct locations',
  '1 correct number and 1 correct location',
  '1 correct number and 1 correct location',
  'all incorrect...',
  '',
  '',
  '',
  '',
  '',
  ''
]
```

`Hint array` is initially populated with \``-`\` values and updated each time 
the user asks for a hint. This array also helps to check if the user is 
already given a randomly selected digit from the secret code. Several 
hints are defined by the game complexity unless the secret code contains 
3 or more identical digits, e.g. '3233' or '4444', then the computer gives 
only one hint.

```
[
  '2', '-', '7', '-',
  '-', '-', '-', '-',
  '-', '-'
]
```

The game continues until the user guesses the code or the user is out of attempts


<li>I drew layouts for every page. This helped me define what objects I will need to return to the client side.</li><br>

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

*code structure:*
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

*code structure:*
```
mastermind 
├── config 
├── controllers 
├── migrations 
├── models
```

*\* `models/index.js` is a part of `Sequelize` ORM and will not be used in this project. `pg-promise` will be used instead. Will keep it here for possible future use.*
</li>

<li>
After having set the database, I created database schemas for <code>Users</code> and <code>Games</code> tables that would 
automatically migrate during the first run.

*code structure:*
```
mastermind
├── migrations
  ├── Users.js
  ├── Games.js
```
</li>

<li>
The next step was to work on the authentification process.<br>
First, I created routes and database queries, which use <code>express-session</code> 
to store information about the user.<br>

*code structure:*
```
mastermind
├── controllers
  ├── users.js
├── routes
  ├── auth.js
```

The configuration of the session is in <code>config/session.js</code><br>
To verify that the user logged in, I added a verification middleware to <code>app.js</code>:<br>

```
app.use('/', protect, indexRouter);
```

*code structure:*
```
mastermind
├── config
  ├── protect.js
  ├── session.js
```

Finally, I added a view and styles for front-end.<br>

*code structure:*
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

*layout:*

<img width="620" alt="login" src="https://user-images.githubusercontent.com/47907411/211639939-538780f8-c0ae-405c-8a53-01ccfb2f6ca3.png">

For testing the application I used Mocha and Chai. I verified that the user can 
register and log in. 
Moreover, I tested that the login/register forms are rendered.<br>

*output:*
```
Auth page
  GET /auth
    ✔ returns 200 (536ms)
    ✔ login form rendered (80ms)
    ✔ register form rendered (65ms)
register and login
  POST /auth/register
    ✔ should return user id
```

*code structure:*
```
mastermind
├── test
  ├── auth.test.js
```
</li>

<li>
The next step was to create a home page, where a player could configure and start the game, and read the rules.<br>
Also, I created a protected route for the home page:<br>
<code>app.use('/', protect, indexRouter);</code>
Then, I added views and styles:<br>

*code structure:*
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

*layout:*

<img width="620" alt="home" src="https://user-images.githubusercontent.com/47907411/211640572-c4c48794-35ad-4fbe-a5c2-b31bce964ef5.png">

</li>

<li>
Before creating a game page, I decided to add game logic that would 
initiate the game object and check win conditions after each move.

*code structure:*
```
mastermind
├── game-logic
  ├── initialize.js
  ├── checkGameStatus.js
  ├── feedback.js
  ├── getCode.js
  ├── hints.js
```
First, the code will be generated in <code>game-logic/getCode.js</code> using <code>https://www.random.org/</code> API.<br>

When the game is generated in the <code>game-logic/initialize.js</code>, a new game object will be returned with the following data:<br>

*`gameData` object example:*
```
{
  totalAttempts: 10,
  complexity: '0',
  hints: 3,
  numberOfPlayers: 1,
  current: 0,
  status: 'In Progress'
  remainedGuesses: 10,
  codeLen: 4,
  style: '0',
  array: [
    '0', '1', '2',
    '3', '4', '5',
    '6', '7'
  ],
  date: 1673116760420
}
```

After each move, guess, feedback and hint arrays will be updated accordinngly.<br>
<code>game-logic/checkGameStatus.js</code> contains win conditions and will 
update the game status after each move.<br>

Finally, I added some tests for the game logic:<br>

*output:*
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

*code structure:*
```
mastermind
├── test
  ├── gamelogic.test.js
```
</li>

<li>
I started working on the `Game page`, which is the key page for this project.<br>
To start, I created routes for the game:<br>

- GET `/game`: renders the game page
- POST `/game`: updates the game object after the user's turn
- POST `/game/start`: initiates the game object
- POST `/game/finish`: saves the game to the database and clears the game object
- POST `/game/hint`: provide a hint for the current game

*code structure:*
```
mastermind
├── routes
  ├── game.js
├── public
  ├── stylesheets
    ├── style.css
├── views
  ├── private
    ├── game.pug
```

*code structure:*
```
mastermind
├── test
  ├── game.db.test.js
```
---
To verify that the finished game can be saved to the game table in the database
and a list of games can be retrieved, I added the following tests.
*output:*
```
Games DB
  saveGame
    ✔ should save a game
  retrieveGames
    ✔ should return a list of saved games
```

*code structure:*
```
mastermind
├── test
  ├── gamelogic.test.js
```

*layout:*

<img width="620" alt="game" src="https://user-images.githubusercontent.com/47907411/211640258-4afea1bb-a903-49ca-9eb5-be819e404157.png">

</li>

<li>
For the list of played games, I simply retrieve the information from the `games` table
where the result is saved and then render as a list of games.

*layout:*

<img width="620" alt="history" src="https://user-images.githubusercontent.com/47907411/211639461-0fab0fcd-935a-4d34-9092-3a6fd1ff2721.png">

</li>

</ol>

# Routes

| Description | API Endpoint |
| :---       | :---        |
| Register a new user | `POST '/auth/register'` <br>Body {username, password} |
| Sign in | `POST '/auth/login'` <br>Body {username, password} |
| Sign out | `POST '/auth/logout'` <br>deletes user data from session |
| Get home page | `GET '/'` <br>uses game data from session |
| Get game history page | `GET '/history'` <br>uses game data from session |
| Get game page | `GET  '/game'` <br>uses game data from session |
| Start a new game | `POST '/game/start'` <br>uses game data from session |
| Make a move | `POST '/game'` <br>uses game data from session |
| Get a hint | `POST '/game/hint'` <br>uses game data from session |
| Finish game | `POST '/game/finish'` <br>uses game data from session |
                       

# Project specifications
- Create an account
- Sign in
- Retrieve a list of public games
- Save a finished game
- Create a new game
- Play mastermind

# Technologies
- NodeJS
- Express
- PostgreSQL
- pg-promises / Sequelize
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

# Challenges

- When setting up a database, I encountered a problem: the port was already in use. 
  I managed to start the database by killing the existing process
```
sudo lsof -i :5432
sudo pkill -u postgres
createdb test_database
pg_ctl -D /usr/local/var/postgresql@15 start
```

- I didn't manage to test all API endpoints due to a lack of knowledge of how 
  to set up `express-session` using `Postman` or` Mocha`. Instead, 
  I created tests for every function related to the game logic 
  or interaction with the database.

# Future work

- [ ] Add levels with 3-digit and 5-digit codes
- [ ] Add a multiplayer mode
- [ ] Add a timer
- [ ] add a timer for each attempt

