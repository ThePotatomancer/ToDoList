import{ db} from '../config/db.js';
import {tasksCollection} from '../config/db.js';
import MongoClient from 'mongodb';
import express from 'express';
const router = express.Router()

const {createTask} = router.post('/tasks', (req, res) => {
    console.log(req.body)
    tasksCollection.insertOne(req.body)
    .then(result => {
      //res.redirect('/')
      res.status(200).json('Success')
    })
    .catch(error => console.log(error))
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