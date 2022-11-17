<div align="center" display="flex">
  <img height="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
  <img height="70px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'>
  <img height="70px" src='https://avatars.githubusercontent.com/u/53864671?v=4'>
  <h1 align="center">API with NodeJs (Typescript), TypeORM and PostgreSQL. Tests with Jest</h1>
</div>

# Developer

<ul>
  <li><a href="https://github.com/PedroMiguel7">Pedro Miguel</a></li>
</ul>

## Index

- [About-the-System](#about-the-system)
- [Progress of the project](#progress)
- [Functionalities](#functionalities)
- [Relationship of the Elements](#relationship-of-the-elements)
- [Routes](#routes)
- [User](#user)
- [Account](#account)
- [Transaction](#transaction)

## About the System

- Application whose objective is to enable NG users to be able to carry out internal transfers between themselves.

- It was developed with [NodeJs](https://nodejs.org/en/), [TypeORM](https://typeorm.io/) and [PostgreSQL](https://www.postgresql.org);
<!-- - The API and Database are not being maintained yet. https://render.com/
- Documentation and testing of routes was done in swagger [swagger](https://app.swaggerhub.com/apis/PedroMiguel7/pokedeks_backend/1.0.0). -->

# Functionalities

| Functionality                         | state |
| -------------------------------------- | :----: |
| Create User                         |   ✔️   |
| Create Account                         |   ✔️   |
| Login/Authenticate user               |   ✔️   |
| Transfer between users                        |   ✔️   |
| using SGBD (PostgreSQL) |   ✔️   |

## Relationship of the Elements

<img src="https://ngcash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F65a8d6ca-b491-4d27-a26e-2d4bcdaed34a%2Fdigram.png?table=block&id=431ddb96-828d-4bd5-b4a7-a8814683b66d&spaceId=6f9b2303-1422-45c0-a306-a5a53110fd01&width=2000&userId=&cache=v2" />


## ROUTES
 - except in the login route and registration of a create new user, ALL other routes can only be accessed with the TOKEN received from LOGIN.

## LOGIN
| POST      |
| --------- |
| /login/|

`/login/` The _LOGIN_ function, if the user exists, returns the token valid for 24h:

```json
{
  username: "adm",
  password: "Administr@do2"
}
```

### USER

| GET           | POST      | PUT                     | DELETE        |
| ------------- | --------- | ----------------------- | ------------- |
| /user/:id/    | /user/    | /user/:id/              | /user/:id/ |

- `/user/1 ` The _GET_ function returns basic user data and your account:

```json
{
  id: 1,
  username: "adm",
  Account: {
    id: 1,
    balance: 100
  }
}
```

- `/user/` The _POST_ function creates a new user with the following data:

```json
{
  username: "adm",
  password: "Administr@do2"
}
```
obs: 
  1 - It is not necessary to be logged in to create a user.
  2 - [Username](#username) must be at least 3 characters long.
  3 - The [password](#password) must be at least 8 characters long, at least one uppercase letter, one number and one special character
  4 - It will also automatically create an [Account](#account) with a balance of 100 (reais)

- `/user/1 ` The _PUT_ function allows changing the user's username the following data:

```json
{
  username: "adm2",
}
```
- `/user/1 ` The _DELETE_ function deletes the user and his account:

obs: 
1 - this function will also delete the user [Account](#account).
2 - just need to pass the id of user in the route.
3 - this feature is being revised to only [DISABLING](#disabling) a user and their account.