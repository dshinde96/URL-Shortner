const mongoose=require('mongoose');

const URLschema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    rediretId:{
        type:String,
        required:true
    },
    visitHistory:[{
        timestamp:{
            type:Number
        }
    }],
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true});

const URL=mongoose.model("URL",URLschema);

module.exports=URL;

