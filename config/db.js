import { username, password, dbname, collection } from "./credentials.js";
import MongoClient from "mongodb";
const connectionString =
  "mongodb+srv://orine:orine123@cluster0.clp5d.mongodb.net/ToDoList?retryWrites=true&w=majoritystring";
//CR: Don't use var. Use let.
var db, tasksCollection;

MongoClient.connect(connectionString, function (err, client) {
  //CR: This does nothing. When I ran the server without a db, it crashed.
  // Should "eat" the error return a proper response about the failure.
  if (err) {
    throw err;
  }
  console.log("Connected successfully to server");
  db = client.db(dbname);
  tasksCollection = db.collection(collection);
  //client.close();
});
//CR: Why did you export db?
export { db, tasksCollection };
