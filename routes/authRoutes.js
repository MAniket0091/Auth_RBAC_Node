const express = require('express');
const { registerController,loginController } = require('../controllers/authController');
const router = express.Router();


// Get All Users API :
router.get('/users',(req,res)=>{

});

// Resgister API :
router.post('/register',registerController);

// Login API :
router.post('/login',loginController);

// Logout API : 

router.post('/logout',(req,res)=>{

});



module.exports = router;