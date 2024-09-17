require('dotenv').config()
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use((req, res, next) => {console.log(`${req.method} ${req.path} - ${req.ip}`); next();})
/* making sure that static files are available */
app.use("/public", express.static(__dirname + "/public"));
/* accessing request payload */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* routes */
/* serving index.html for home */
app.get("/", (req, res) => {res.sendFile(__dirname + '/views/index.html')})

function alma(input){
    return input;
}

/* let's have a look at the form data */
app.get("/form", (req, res) => {
    res.json({
        "firstName": req.body.first,
        "lastName": req.body.last
    });
})

app.get("/json", (req, res) => {
    res.json({
        "message": process.env.MESSAGE_STYLE == "uppercase"?alma('barack').toUpperCase():alma("barack")
    })
})

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time})
}
)

app.get("/:word/echo", (req, res) => {
    const word = req.params.word;
    res.json({echo: word});
  });

app.route("/name")
.get((req, res) => {
    res.json({
        name: `${req.query.first} ${req.query.last}` 
    });
})
.post((req, res) => {
    res.json({
        name: `${req.body.first} ${req.body.last}` 
    });
})


































 module.exports = app;
