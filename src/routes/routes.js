const express  = require('express');
const  companyController =require('../controllers/controllers.js');
const companyRouter = express.Router();

//routes
companyRouter.get('/save',companyController.postCompanyDetailsController);

companyRouter.get('/:id',companyController.getCompanyDetailsController);

companyRouter.patch('/:id',companyController.updateCompanyDetailsController);

//userRouter.post('/',userController.postUserController);

module.exports=companyRouter;

