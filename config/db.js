import{username, password, dbname, collection} from './credentials.js'
import MongoClient from 'mongodb'
// CR: why have username and password as part of seperate config if you just hardcode them here?
const connectionString = 'mongodb+srv://orine:orine123@cluster0.clp5d.mongodb.net/ToDoList?retryWrites=true&w=majoritystring'
var db, tasksCollection;

// CR: neat quirk - db and taksCollection are set by the callback of connect
// however you export them outside the callback, this means you can use them
// before they are intiallized (the callback is semi-asynchronous)
// you will see why this is important in tasks controller
MongoClient.connect(connectionString, function(err, client) {
  if(err){throw err}
  console.log("Connected successfully to server");
  db = client.db(dbname);
  tasksCollection = db.collection(collection);
  //client.close();
});
export {db, tasksCollection} 