const express=require('express');
const router=express.Router();
const {handleUserSignup,handleUserLogin}=require('../Controller/User');
router.post('/Signup',handleUserSignup);
router.post('/Login',handleUserLogin);

module.exports=router;