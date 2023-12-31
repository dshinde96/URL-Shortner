const User=require('../Models/user');
const{setUser}=require('../Services/auth');


const handleUserSignup=async(req,res)=>{
    const {name,email,password}=req.body;
    const user=await User.create({name,email,password});
    const authTocken=setUser(user);
    res.cookie('authTocken',authTocken);
    return res.redirect("/");   //localhost/ with get method
}
const handleUserLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render('login',{msg:"invalid credentials"});
    }
    const authTocken=setUser(user);
    res.cookie('authTocken',authTocken);
    return res.redirect("/");
}
module.exports={handleUserSignup,handleUserLogin}