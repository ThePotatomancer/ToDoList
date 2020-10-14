 // CR: while not required, using ';' at the end of each statement in JavaScript is highly recommended
import express from 'express'
import bodyParser from 'body-parser'
// CR: while not an iron rule, it is generally accepeted to do all imports at the top of the file
// before any other statment, like consts
const app = express()
import {router} from './controllers/tasks.js'

app.set('view engine', 'ejs')

/*
    CR: you should probably use cors middleware
    cors is a safty mechanism that provides a whitelist of allowed domains
    by default only your own domain can access the server - so you can use this server
    only from the same computer right now
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', router)
app.post('/tasks', router)
app.put('/tasks', router)
app.delete('/tasks',router)
/* CR: the port is hard coded to 8080 - this can be a problem if said port is busy, it would mean
   you have to change the code for simple config
   also you are definetly not listening on port 3000 currently, making the log dynamic will help
   against misinformation
*/
app.listen(8080, () => console.log('Example app listening on port 3000!'));

