const express=require('express');
const router=express.Router();
const {handleURLShortner}=require('../Controller/ShortURL');
router.route('/:shortid').get(handleURLShortner);

module.exports=router;