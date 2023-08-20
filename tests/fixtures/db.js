import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Task from "../../src/models/tasks.js";
import User from "../../src/models/users.js";

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneID,
  name: "Mike",
  email: "mike@exmaple.com",
  password: "56what!",
  tokens: [{
    token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET),
  }],
};

const userTwoID = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoID,
  name: "Cross",
  email: "cross@exmaple.com",
  password: "myCat123!!_",
  tokens: [{
    token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET),
  }],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "This is a test task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "This is the second test task",
  completed: false,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "This is the third test task",
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

export { setupDatabase, taskOne, taskThree, taskTwo, userOne, userOneID, userTwo, userTwoID };
