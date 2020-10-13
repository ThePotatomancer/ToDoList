import{username, password, dbname, collection} from './credentials.js'
import MongoClient from 'mongodb'
const connectionString = 'mongodb+srv://orine:orine123@cluster0.clp5d.mongodb.net/ToDoList?retryWrites=true&w=majoritystring'
var db, tasksCollection;

MongoClient.connect(connectionString, function(err, client) {
  if(err){throw err}
  console.log("Connected successfully to server");
  db = client.db(dbname);
  tasksCollection = db.collection(collection);
  //client.close();
});
export {db, tasksCollection} 