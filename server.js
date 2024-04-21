const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connect_db = require('./config/db.js')



//config
dotenv.config();

//route
const userRoutes = require('./routes/userRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')
//connect database
connect_db()

// rest object
const app = express();



// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Port 
const port = process.env.PORT || 8000;

//users
app.use('/api/v1/user', userRoutes)
//blogs
app.use('/api/v1/blog', blogRoutes)

app.listen(port, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on  \nPORT:  ${port}`);
})