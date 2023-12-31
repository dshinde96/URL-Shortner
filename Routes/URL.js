const express=require('express');
const router=express.Router();
const {handelGenerateNewShortURL,handleGetAnalytics}=require('../Controller/URL')
router.route('/').post(handelGenerateNewShortURL);
router.route('/analytics/:shortid').get(handleGetAnalytics);

module.exports=router;