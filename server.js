const express=require('express');
const sql=require('mysql2');
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors());

const db=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    port:3306,
    database:'car_db'
});

db.connect((err)=>{
    if(err){
        console.log("err")
    }
    else{
        console.log("connec");
    }
});

app.get('/car',(req,res)=>{
    db.query(`select * from car`,(err,result)=>{
        if(err){
            console.log("err in get");
        }
        else{
            res.send(result);
        }
    })
});
app.put('/car',(req,res)=>{
    const {name,model,id}=req.body;
    db.query(`update car set name=?,model=? where id=?`,[name,model,id],(err,result)=>{
        if(err){
            console.log("err in get");
        }
        else{
            res.send(result);
        }
    })
});
app.post('/car',(req,res)=>{
    const e=req.body;
    db.query(`insert into car values(?,?,?)`,[e.id,e.name,e.model],(err,result)=>{
        if(err){
            console.log("err in get");
        }
        else{
            res.send(result);
        }
    })
});
app.delete('/car',(req,res)=>{
    const e=req.body;
    db.query(`delete from car where id=?`,[e.id],(err,result)=>{
        if(err){
            console.log("err in get");
        }
        else{
            res.send(result);
        }
    })
});
app.listen(6060,()=>{console.log("server listening")});
