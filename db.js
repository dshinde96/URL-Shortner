
const mongoose=require('mongoose');

const ConnectToMongo=(mongoURL)=>{
    return mongoose.connect(mongoURL).then(()=>console.log("Mongodb Connected")).catch((error)=>console.log(error.message));
}

module.exports=ConnectToMongo;