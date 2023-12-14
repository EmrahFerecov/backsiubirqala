const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app=express()
const { Schema } = mongoose;


const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }],
    image: { type: String, required: true },
})
app.use(cors())
app.use(bodyParser.json())



const Books=mongoose.model("books",bookSchema)

//Get All Books

app.get("/books",async (req,res)=>{
    try {
        const books=await Books.find({})
        res.send(books)
    } catch (error) {
        res.status(500).json({message:error})
    }
})

//Book get by id

app.get("/books/:id",async (req,res)=>{
    try {
        const book=await Books.findById(req.params.id)
        
            res.send(book)
       
    } catch (error) {
        res.status(500).json({message:error})
    }
})


//Add Book
app.post("/books",async(req,res)=>{
    const book=new Books({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        image:req.body.image
    })
   await book.save()
    res.send({message:"Book Created"})
})

//Book Update
app.put("/books/:id",async (req,res)=>{
    try {
        const book=await Books.findByIdAndUpdate(req.params.id)

        if(book){
            book.title=req.body.title,
            book.description=req.body.description,
            book.category=req.body.category,
            book.image=req.body.image

            await book.save()
            res.json(book)
        }else{
            res.status(404).json({message:"Not Found"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
})

//Delete Book

app.delete("/books/:id",async (req,res)=>{
    try {
       await Books.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Book Deleted"})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
})


const PORT=process.env.PORT
const url=process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err=>console.log("Db not connect"))

app.listen(PORT,()=>{
    console.log("Server Connection");
})
