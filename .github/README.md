<div align="center">
<h1>📅 Task Manager  API </h1>

An API for managing several users and their tasks

Current version : 1.0
</div>

---

# Usage

After cloning the repository, run the following command in
the same directory that has the `package.json` file in  it:

```zsh
npm install
```

The API uses [MongoDB](https://www.mongodb.com/)
(v 4.0.4) for storing user data, tokens and task
data. Hence, it is necessary to have a
MongoDB server running either locally, or hosted on any platform
like [Atlas](https://www.mongodb.com/cloud/atlas/register).
To test out the API, you can use a [docker](https://www.docker.com/)
container as

```zsh
docker pull mongo:4.0.4
docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo:4.0.4
```

and then start the container.

## Note

The website has not been hosted on any platform as of 20/08/2023,
so the API will only work on a server you create or own.

Additionally, you will have to create a `.env` file inside with the following contents:

```env
PORT=<number>
JWT_SECRET=<string>
MONGODB_URL=<example URL>
```

(All the terms enclosed in <> must be replaced with their respective values,
and the "<>" must be removed. No quotes must be used)

An example `.env` file is:

```env
PORT=3000
JWT_SECRET=generateAuth
MONGODB_URL=mongodb://0.0.0.0:27017/task-manager-api
```

Once your server is up and running, you can use the following command:

```bash
npm run dev
```

To use the API. It is recommended to use an application like
[Postman](https://www.postman.com/) to
send requests back and forth to the server.

The contents of the database can by accessed using
[MongoDB Compass](https://www.mongodb.com/products/compass), or
the MongoShell, which can be accessed via the terminal (in the case of
a docker container, first `exec` the container and use the `mongo` command)

### Testing

Some preliminary test suites have been included under `📁 tests/`
and the API is tested using the [Jest Framework](https://jestjs.io/).

To use it, first create a new `.env` file inside `📁 tests/` with
contents similar to the main `.env` file inside the CWD. An example
configuration is:

```env
PORT=3000
JWT_SECRET=generateAuth
MONGODB_URL=mongodb://0.0.0.0:27017/task-manager-api-test
```

You can add your own test suites and testcases in this directory, along
with some test files inside `📁 tests/fixtures/` to test out the API.

Run the following command to test:

```zsh
npm test
```

---
Project started on: 15/06/2023

(v1.0) First functional version completed on: 23/07/2023
