const URL = require("../Models/URL");

//redirect user to the original link
const handleURLShortner=async(req,res)=>{
    const url=await URL.findOne({shortId:req.params.shortid});
    if(!url){
        return res.status(400).send({msg:"Bad request"});
    }
    await URL.findByIdAndUpdate(url._id,{$push:{
        visitHistory:{
            timestamp:Date.now()
        }
    }});

    return res.redirect(url.rediretId);
}

module.exports={handleURLShortner};