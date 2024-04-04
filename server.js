
const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

//adding two number
const addTwoNumber = (num1,num2) => {
    return num1+num2;
}

const subTwoNumber = (num1,num2) => {
    return num1-num2;
}

const mulTwoNumber = (num1,num2) => {
    return num1*num2;
}

const divTwoNumber = (num1,num2) => {
    if(num2 == 0){
        logger.error("Division by zero is not possible");
        throw new Error("Division by zero is not possible")
    }
    return num1/num2;
}

const numberParse = (req)  => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1)) {
        logger.error("num1 is incorrectly defined");
        throw new Error("num1 incorrectly defined");
    }
    if(isNaN(num2)) {
        logger.error("num2 is incorrectly defined");
        throw new Error("num2 incorrectly defined");
    }
    return{num1, num2};
}

//addTwoNumber endpoint
app.get("/addTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req);
        logger.log({
            level: 'info',
            message: 'New addition operation requested : '+num1+ '+' +num2+ '.', 
        })
        const result = addTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    } 
});

app.get("/subTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req);
        logger.log({
            level: 'info',
            message: 'New subtraction operation requested : '+num1+ '-' +num2+ '.', 
        })
        const result = subTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }  
});

app.get("/mulTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req);
        logger.log({
            level: 'info',
            message: 'New multiplication operation requested : '+num1+ '*' +num2+ '.', 
        })
        const result = mulTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

app.get("/divTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req);
        logger.log({
            level: 'info',
            message: 'New division operation requested : '+num1+ '/' +num2+ '.', 
        })
        const result = divTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

app.use(express.static('public'));

//listening port message

const port=3000;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
})