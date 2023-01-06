# Mastermind Game

# Сontents
- [Mastermind Game](#mastermind-game)
- [Сontents](#сontents)
- [About the game](#about-the-game)
- [Deployment](#deployment)
- [Extensions](#extensions)
- [Design Process](#design-process)
- [Project specifications](#project-specifications)
  - [Features](#features)
- [Technologies](#technologies)
- [Dependencies](#dependencies)


# About the game

# Deployment

Deployed to [Render](https://mastermind.onrender.com/auth)

# Extensions

- [ ] Add support to give hints
- [ ] Add a configurable “difficulty level” and adjust the number of numbers that are used
- [ ] Draw all of graphical components, add animations and sounds
- [ ] Change numbers into colored pegs, shapes, animals, etc
- [ ] Keep track of scores
- [ ] Add a timer for the entire game, or each guess attempts
- [ ] Anything else that you come up with to make the game more fun/interesting!


# Design Process

I started with designing the game logic: <br/>
<img width="621" alt="Screenshot 2023-01-04 at 10 06 13" src="https://user-images.githubusercontent.com/47907411/210621068-633edcd3-62bf-4af0-946e-f493aca4dd1d.png">

Then I drew layouts for every page so I could define what data I will need to return for rendering

<img width="417" alt="Screenshot 2023-01-06 at 09 59 47" src="https://user-images.githubusercontent.com/47907411/211071400-561e22d2-dcd9-4587-be23-55ef1d721ea1.png">


# Project specifications
## Features
- Create an account
- Login
- Retrieve list of public games
- Create game
- Play mastermind

# Technologies
- NodeJS
- Express
- PostgreSQL
- pg-promises
- Pug

# Dependencies
 mastermind <br/>
├── axios@1.2.2 <br/>
├── bcrypt@5.1.0 <br/>
├── cookie-parser@1.4.6 <br/>
├── debug@2.6.9 <br/>
├── dotenv@16.0.3 <br/>
├── express-session@1.17.3 <br/>
├── express@4.18.2 <br/>
├── http-errors@1.6.3 <br/>
├── mocha@10.2.0 <br/>
├── morgan@1.9.1 <br/>
├── nodemon@2.0.20 <br/>
├── pg-promise@10.15.4 <br/>
├── prompt@1.3.0 <br/>
├── pug@3.0.2 <br/>
├── sequelize-cli@6.5.2 <br/>
└── sequelize@6.28.0 <br/>

