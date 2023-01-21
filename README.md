# Readme

<h3 align="center">
  Back-end Social Media App
</h3>

<p align="center">
  <img alt = "Github Last Confirmation" src = "https://img.shields.io/github/last-commit/mrabello23/social-media-app">
  <img alt = "GitHub Main Language" src = "https://img.shields.io/github/languages/top/mrabello23/social-media-app">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/mrabello23/social-media-app?color=%2304D361">
</p>

## Summary

> This project is a backend implementation for a social media

| Method   | Endpoint           | Description                 |
| -------- | ------------------ | --------------------------- |
| **GET**  | ​/                 | Check if app is online      |
| **POST** | /v1/user/profile   | Get user profile with feed. |
| **GET**  | /v1/user/:username | Get user info by username.  |
| **POST** | /v1/post/feed      | Get posts by filter.        |
| **POST** | /v1/post           | Create new post.            |
| **POST** | /v1/repost         | Create new repost.          |
| **POST** | /v1/quote-post     | Create new quote-post.      |

#### <span style="font-weight:bold;"> Base url: </span> http://localost:3000/

##### <span style="font-weight:bold;"> \* Insomnia Collection with endpoint and parameter details inside /docs folder </span>

## Getting Started

These instructions will get this project up and running in your machine.

### Pre Requisites

> [Node.js](http://nodejs.org/) \
> [NPM](https://www.npmjs.com/) \
> [Docker](https://www.docker.com/)

### Running project

- Make sure Docker is running:

  ```sh
  $ docker info
  ```

- Run database:

  ```sh
  $ docker-compose up -d
  ```

- Stop database:

  ```sh
  $ docker-compose down
  ```

- Install all packages:
  <span style="color: #FF0000"> Make sure node version > v16.0.0+ </span>

  ```sh
  $ npm install
  ```

- Run project:

  ```sh
  $ npm run build
  ```

  ```sh
  $ npm start
  ```

- Run tests:

  ```sh
  $ npm run test
  ```

### Critique

> Possible Improvements

- More cenarios for unit and integration tests;
- Use a high-level ORM;
- Better use of Middlewares (validate cache, extract user infos);
- Create an OAuth authentication layer;
- Better use of projects design pattern;
- Better reuse of objects;

> Scaling up

- Consider a cloud architecture with containers, external cofigurations, load ballance and scalling policies;
- Consider a persistent cache layer, like Redis, for boost performance;
- Consider an Api Gateway service with rate limit and throttling configurations;
- Adopt modern tools (like ORM or service mesh) which can handle with concurrencies;
