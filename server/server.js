const express = require('express') // express server
const dotenv = require('dotenv') // manage environment variables
const morgan = require('morgan') 
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')

// load environmnet variables
dotenv.config({path : './config/config.env'});

//connect to DB
connectDB()

//Router Files
const adminRoutes = require('./routes/adminRoutes.js')
const builderRoutes = require('./routes/builderRoutes.js') 
const architectRoutes = require('./routes/architectRoutes.js')

const app = express();

//allowing cors request
app.use(cors({ credentials: true, origin: "*" }));

//Body Parser
app.use(express.json());

 // Dev logging Middleware
if(process.env.NODE_ENV === 'Development'){
    app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/admin' , adminRoutes)
app.use('/api/v1/builder', builderRoutes)
app.use('/api/v1/architect' , architectRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT ,
console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
.yellow.bold));