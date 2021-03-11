var express =require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const mongoURI= 'mongodb://localhost:27017/oquiz'

mongoose.connect(mongoURI,{useNewUrlParser:true}).then(()=>console.log("MongoDb Connected...")).catch(err=>console.log(err))

var question = require('./routes/profile');



app.use('/route',question)
// phani work
const question_routes = require('./routes/questionRoutes')
const category_routes = require('./routes/categoryRoutes')
const test_routes = require('./routes/testRoutes')
const summary_routes = require('./routes/testSummaryRoutes')
 
app.use('/api',question_routes)
app.use('/api',category_routes)
app.use('/api',test_routes)
app.use('/api',summary_routes)




app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})

// updated by sri lakshmi