const { Server } = require("mongodb")
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const app = express();
const connectionString = 'mongodb+srv://orine:orine123@cluster0.clp5d.mongodb.net/ToDoList?retryWrites=true&w=majoritystring'; 

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ToDoList')
    const tasksCollection = db.collection('tasks')
    
    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.post('/tasks', (req, res) => {
      console.log(req.body)
      tasksCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.log(error))
})

    app.get('/', (req, res) => {
      db.collection('tasks').find().toArray()
        .then(results => {
          res.render('index', { tasks : results })
          console.log(results)
        })
        .catch(error => console.error(error))
    })

    app.put('/tasks', (req, res) => {
      console.log(req.body + '11111111111111111')
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
        res.json('Success')
       })
      .catch(error => console.error(error))
    })  

    app.delete('/tasks', (req, res) => {
        tasksCollection.findOneAndDelete(
          { title: req.body.title }
        )
          .then(result => {
            res.json(`Deleted task`)
          })
          .catch(error => console.error(error))
      })

    app.listen(8080, (req, res) => { 
    console.log('listening on 8080')
})
  })
  .catch(error => console.error(error))