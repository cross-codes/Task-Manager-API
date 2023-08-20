import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/users.js";
import { setupDatabase, userOne, userOneID } from "./fixtures/db.js";

beforeEach(setupDatabase);

test("Should signup new user", async () => {
  const response = await request(app).post("/users").send({
    name: "Andrew",
    email: "andrew@example.com",
    password: "aaron!!__",
  }).expect(200);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email: "andrew@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("aaron!!__");
});

test("Should login existing user", async () => {
  const response = await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);

  const user = await User.findById(userOneID);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login existing user", async () => {
  await request(app).post("/users/login").send({
    email: userOne.email,
    password: "rickroll",
  }).expect(400);
});

test("Should get profile for user", async () => {
  await request(app).get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthorized user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneID);
  expect(user).toBeNull();
});

test("Should not delete account if unauthorized", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/pokemon.png")
    .expect(200);

  const user = await User.findById(userOneID);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  const newUser = {
    name: "Maddison",
    email: "maddison@example.com",
    password: "maddison!!__",
  };
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(newUser).expect(200);

  const user = await User.findById(userOneID);
  expect(user.name).toBe(newUser.name);
  expect(user.email).toBe(newUser.email);
});

test("Should not update invalid user fields", async () => {
  const badUser = {
    name: "Sarah",
    location: "New Jersey",
  };
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(badUser).expect(400);
});
