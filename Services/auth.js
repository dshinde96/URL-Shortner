
const jwt=require("jsonwebtoken");
const fs=require('fs');
let secretKey="";

//read the secretkey from the file
fs.readFile('./Private.txt','utf-8',(err,res)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        secretKey=res;
    }
});


//setUser- Generate a authtocken for a user
const setUser=(user)=>{
    const payload={
        user:{
            name:user.name,
            email:user.email,
            id:user._id,
            role:user.role
        }
    }
    const authTocken=jwt.sign(payload,secretKey);
    return authTocken;

}

//returns the user from payload of authtocken
const getUser=(authTocken)=>{
    try {
        const payload=jwt.verify(authTocken,secretKey);
        console.log(payload);
        return payload.user;

    } catch (error) {
        console.log(error.message);
        return {};
    }
}

module.exports={
    setUser,getUser
}