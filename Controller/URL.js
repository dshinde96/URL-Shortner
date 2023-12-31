const shortid = require('shortid');
const URL=require('../Models/URL');

//generates a new shortid and map the id with redirect link
const handelGenerateNewShortURL=async(req,res)=>{
    const ShortId=shortid.generate(8);  //Generate the shortId with 8 Characters
    const {url}=req.body;
    if(!url){
        return res.status(400).send({msg:"Url required"});
    }
    await URL.create({
        shortId:ShortId,
        rediretId:url,
        visitHistory:[],
        User:req.user.id
    }) 

    return res.render('Home',{id:ShortId})
}

//returns the analytics of the particular url
const handleGetAnalytics=async(req,res)=>{
    const url=await URL.findOne({shortId:req.params.shortid});
    res.send({clicks:url.visitHistory.length});
}
module.exports={handelGenerateNewShortURL,handleGetAnalytics}