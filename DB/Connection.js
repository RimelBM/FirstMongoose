const mongoose = require('mongoose');

let mongodb = process.env.MONGODB_UI ;

console.log(process.env.MONGODB_UI); 



mongoose.connect(mongodb ||'mongodb://localhost/server',{
        useNewUrlParser:true,
        useUnifiedTopology:true
       }     
  )

mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected ')
})


