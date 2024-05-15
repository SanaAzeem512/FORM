import express from "express"
import path from "path"
import mongoose from "mongoose"
 
const app= express()


// Mongodb connection 

mongoose.connect("mongodb://localhost:27017",{
    dbName:"Backend"
}).then(()=>console.log("database is connecting")).catch((e)=>console.log(e))

// schema form data
const userSchema= new mongoose.Schema({
    name : String,
    email: String,
})

// Collection
const data =mongoose.model("userdata",userSchema)

//Middlewares
app.set("view engine","ejs")
app.use(express.static(path.join(path.resolve(),"public")))
app.use(express.urlencoded({extended: true}))

app.get("/",(req, res) => {
    res.render("index")
})

app.get("/add",async(req,res)=>
{
    await data.create({name: "azeem",email:"sana416@gmail.com"})
    res.send("nice")
})

app.post("/contact", async(req,res) =>
{ 
    const message ={name : req.body.name , email: req.body.email}
    await data.create(message)
    res.redirect("success")
})

app.get("/success",(req,res) =>
{
    res.render("success")
})

app.get("/user",(req,res) =>
{
    res.json({
        user
    })
}) 
app.listen(4000,() =>{
console.log("server is running")
})




