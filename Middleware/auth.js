const {getUser}=require('../Services/auth');

//authenticate the user
const fetchUser=(req,res,next)=>{
    //stateless authentication
    const authTocken=req.cookies?.authTocken;
    if(!authTocken){
        return res.redirect('/login')
    }
    const user=getUser(authTocken);
    if(!user){
        return res.redirect('/login');
    }
    req.user=user;
    next();
}

//authorise the role of user
const restrictUser=(roles)=>{
    return ((req,res,next)=>{
        if(!roles.includes(req.user.role))
        return res.end("Unauthorized access");
        next();
    })
}

module.exports={fetchUser,restrictUser};