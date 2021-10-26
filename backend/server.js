const express = require('express')
const app = express()
const dotenv = require('dotenv')
const arif = require('./data/notes')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

dotenv.config()
connectDB();

app.get("/",(req,res)=>{
    res.send('api is running')
})

// app.get("/api/notes",(req,res)=>{
//     res.json(arif)
// })

// app.get("/api/notes/:id",(req,res)=>{
    
//     const note = arif.find((n)=> n._id === req.params.id)

//     res.send(note)
// })


app.use(express.json()); // to accept json data

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log('server is running on port 5000')
})