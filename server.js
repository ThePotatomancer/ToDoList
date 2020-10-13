//CR: Should name this file "index.js" cause it's the main file.
import express from "express";
import bodyParser from "body-parser";
const app = express();
import { router } from "./controllers/tasks.js";

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//CR: Could have written app.use('/tasks', router) instead of writing get,post,put,delete here
app.get("/", router);
app.post("/tasks", router);
app.put("/tasks", router);
app.delete("/tasks", router);
app.listen(8080, () => console.log("Example app listening on port 3000!"));
