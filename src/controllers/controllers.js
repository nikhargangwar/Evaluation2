const companyServices = require( '../services/services.js');
const HTTPError = require('../utils/httperror.js');

const postCompanyDetailsController = async(req,res)=>{

    try{
    const storeCompanyDetails = companyServices.storeCompanyDetails();
   //const storeCompanyScore = companyServices.storeCompanyScore();

    return res.send(await storeCompanyDetails);
    //return res.status(200).json({data:result});
    }
    catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message });
        }
        res.status(500).send(err.message);
    }

};

const  getCompanyDetailsController = async(req,res)=>{
    try{
    const {sector} =  req.query;
    res.send(await companyServices.getCompanyDetailsInRankingOrder(sector))
    }
    catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message });
        }
        res.status(500).send(err.message);
    }
}

// const postUserController = (req,res)=>{
//     const result = userServices.postUserdata(req.body);
//     return res.status(201).json(result);
// };


module.exports= {postCompanyDetailsController,getCompanyDetailsController};