import { db } from "../config/db.js";
import { tasksCollection } from "../config/db.js";
//CR: Shouldn't import things you don't use.
import MongoClient from "mongodb";
import express from "express";
const router = express.Router();
/*CR: This file does too many things. And it's name is not indicative.
It's responsible for:
1. The router - the router is created here and the logic of "is it post/get/etc" is here
with the appropriate logic it should have.
2. The Logic ("Controller") - which logic should be evoked? Examples below.
3. The Access Layer (Db communication here) - You used specific db communication methods here.

The problem with this is that if you want to change something (the logic/ the db/ etc)
you have to touch the same file. It's less readable, bound to bugs, and doesn't allow to switch
things easily - It breaks the SRP rule. Read about SOLID if you haven't already.
Seperate the functionality above into appropriate seperate files.
*/

//CR: After you've written app.use("/tasks", router) in server.js, you could have written just router.post('/', etc...
/*CR: You gave names but didn't use them. and you didn't have to because the logic is written here as well.
You can simply delete the "const {} =". Although when you will seperate this file into smaller ones,
you will have to put the logic inside functions (then use their names)*/
const { createTask } = router.post("/tasks", (req, res) => {
  console.log(req.body);
  tasksCollection
    .insertOne(req.body)
    .then((result) => {
      //res.redirect('/')
      res.status(200).json("Success");
    })
    .catch((error) => console.log(error));
});

const { getTask } = router.get("/", (req, res) => {
  //CR: You have tasksCollection, why use db.collection("tasks")?
  db.collection("tasks")
    .find()
    .toArray()
    .then((results) => {
      res.render("index", { tasks: results });
      console.log(results);
    })
    .catch((error) => console.error(error));
});

const { updateTask } = router.put("/tasks", (req, res) => {
  tasksCollection
    .findOneAndUpdate(
      //CR: Why do you have magic strings here? Why don't you get the values with req?
      { title: "orine", description: "bason" },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json("Success");
    })
    .catch((error) => console.error(error));
});

const { deleteTask } = router.delete("/tasks", (req, res) => {
  tasksCollection
    .findOneAndDelete({ title: req.body.title })
    .then((result) => {
      res.status(200).json(`Deleted task`);
    })
    .catch((error) => console.error(error));
});

//CR: Could have written "export default router", you don't export nothing else.
export { router };
