let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {res.sendFile(__dirname + '/views/index.html')})

function alma(input){
    return input;
}

app.get("/json", (req, res) => {res.json({"message": alma("barack")})})




































 module.exports = app;
