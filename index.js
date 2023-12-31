const ConnectToMongo=require('./db');
const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const {fetchUser,restrictUser}=require('./Middleware/auth');


//mongodb connection
const mongoURL='mongodb://127.0.0.1:27017/URLshortner';
ConnectToMongo(mongoURL);


const app=express();
app.use(express.json());  //to parse json data
app.use(express.urlencoded({extended:false})) //to parse from data as in case of server side rendering we are passing form data
app.use(cookieParser());   //to parse the cookies from incoming requests
const port=8001;
app.set("view engine","ejs");
app.set('views',path.resolve('./Views'));   //will resolve all the files from views to render on ui


app.use('/',require('./Routes/StaticRoutes'));
//this route can be access by both user as well as admin
app.use('/URL',fetchUser,restrictUser(["Admin","Normal"]),require('./Routes/URL'));   //generate new short url and see the analytics -login required
app.use('/url',require('./Routes/ShortURL'));   //redirect to page using shortid- no login required
app.use('/user',require('./Routes/User'));   //login signup --no login required

app.listen(port,()=>console.log(`App listening on port ${port}`))