const express  = require('express');
const  companyController =require('../controllers/controllers.js');
const companyRouter = express.Router();

//routes
companyRouter.get('/:id',companyController.getCompanyDetailsController);

companyRouter.get('/save',companyController.postCompanyDetailsController);
//userRouter.post('/',userController.postUserController);

module.exports=companyRouter;

