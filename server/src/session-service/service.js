// Byron Rosas => Session service

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
dotenv.config();


// express app
const app = express();

// white origin list
var whiteList = [
    'http://127.0.0.1:8100',
    'http://localhost:8100'
];

var corsOptionsFunction = (req,callback)=>{
    var opt;
    
    if(whiteList.indexOf(req.header('Origin'))!== -1){
        // opt with origin true => enable CORS for this request
        opt = {
            origin:true
        }
    }else{
        // opt with origin false => disable CORS for this request
        opt = {
            origin:false
        }
    }

    // callback params (error, opt)
    callback(null, opt);
}


// use cors with opt function
app.use(cors(corsOptionsFunction));


app.use(helmet());
app.use(express.json({limit:"1MB"}));
app.use(express.urlencoded({ limit:"1MB", extended: false }));
app.use(cookieParser());


// routes
app.use('/API/user',authRouter);


//  handle error
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);

    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
})

export default app;