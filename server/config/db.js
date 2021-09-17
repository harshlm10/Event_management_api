const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.Mongo_URI , {
        useNewUrlParser : true,
        useFindAndModify : false,
        useCreateIndex : true,
        useUnifiedTopology : true
    })
    console.log(`Database Connected ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB