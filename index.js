const express = require(`express`);
const { getAllUsers, addUser, updateUser } = require(`./utils`);

const app = express();
app.use(express.json()); //needed to recieve data

// id example: http://localhost:port/sample/123
/**
 * app.get('/sample/:id', function(req, res) {

 var id = req.params.id; //or use req.param('id')
 
 */

// example: http://localhost:port/sample?id=123
/**
 * app.get('/sample', function(req, res) {

     var id = req.query.id; 
 */

// http://localhost:port/sample/123?id=123
/**
 * app.get('/sample/:id', function(req, res) {

 var id = req.params.id; //or use req.param('id')
 var id2 = req.query.id; 
  ................
 */
// xx?id var id = req.query.id; 
// xx:id var id = req.params.id; //or use req.param('id')

//Resource GET, shouldn't alter state.
app.get("/", (req, res) => {
  try {
    res.status(200).send("Welcome To  My Bank");
  } catch (e) {
    res.status(503).send(" Service Unavailable");
  }
});

app.get("/users/:id", (req, res) => {
  try {
    //console.log(req.params);
    res.status(200).send(getUser(req.params.id));
  } catch (e) {
    res.status(404).send({ error: e.message }); //404 means resource not found
  }
});
app.get("/users", (req, res) => {
  try {
    res.status(200).send(getAllUsers());
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});
//Used to add new resources POST
app.post("/users", (req, res) => {
  //create new
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
// 	Used to update existing resources PUT
app.put("/users/:id", (req, res) => {
  //edit existing
  try {
    res.status(201).send(updateUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
