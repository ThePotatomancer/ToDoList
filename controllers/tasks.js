import{ db} from '../config/db.js';
import {tasksCollection} from '../config/db.js';
import MongoClient from 'mongodb';
import express from 'express';
const router = express.Router()

const {createTask} = router.post('/tasks', (req, res) => {
    console.log(req.body)
    /* CR: 
       here you are, using tasksCollection without care in the world.
       but oh no! tasksCollection is undefined! if this hasn't happend to you during testing 
       you are quite lucky, because tasksCollection can be undefined (see the quirk comment in db.js)
    */
    tasksCollection.insertOne(req.body)
    .then(result => {
      //res.redirect('/')
      // CR: 'Success' is quite a poor json indeed. maybe text will fit better?
      res.status(200).json('Success')
    })
    .catch(error => console.log(error))
    // CR: note that you don't send back a response in case of error, only on success
    // the user will wait till a timeout to know of the error, and will have no idea what the error is
})

const {getTask} = router.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
      .then(results => {
        res.render('index', { tasks : results })
        console.log(results)
      })
      .catch(error => console.error(error))
  })

  const {updateTask} = router.put('/tasks', (req, res) => {
    // CR: naive of you to expect the body to contain a title and a description
    // should probably check if they are provided first thing first
    tasksCollection.findOneAndUpdate(
      { "title": "orine",
      "description" : "bason"},
      {
        $set: {
          "title": req.body.title,
          "description": req.body.description
        }
      },
    )
    .then(result => {
      console.log(result)
      res.status(200).json('Success')
     })
    .catch(error => console.error(error))
  })  

const {deleteTask} = router.delete('/tasks', (req, res) => {
      tasksCollection.findOneAndDelete(
        { title: req.body.title }
      )
        .then(result => {
          res.status(200).json(`Deleted task`)
        })
        .catch(error => console.error(error))
    })
export {router}