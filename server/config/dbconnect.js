const { default : mongoose } = require('mongoose')

const dbConnect = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if(conn.connection.readyState === 1) console.log('DB connecttion is sucessfully ')
        else console.log('DB connecting')
    }
    catch (err){
        console.log('DB connection is failed')
        throw new Error(err)
    }
}
 
module.exports = dbConnect