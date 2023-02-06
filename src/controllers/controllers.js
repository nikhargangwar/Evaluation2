const companyServices = require( '../services/services.js');
const {HTTPError} = require('../utils/httperror.js');

const postCompanyDetailsController = async(req,res)=>{

    try{
    const storeCompanyDetails = companyServices.storeCompanyDetails();
   //const storeCompanyScore = companyServices.storeCompanyScore();

    return res.send(await storeCompanyDetails);
    //return res.status(200).json({data:result});
    }
    catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.statusCode).send({ message: err.message });
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
            return res.status(err.statusCode).send({ message: err.message });
        }
        res.status(500).send(err.message);
    }
}

const updateCompanyDetailsController = async(req,res)=>{
    try{
       // console.log(req.query)
        const companyId =  req.params.id;
        const {ceoName} =  req.body;

        const result = await companyServices.updateCompanyDetailsInDb(companyId,ceoName);
        if (result===0) {
            return res.json({ message: 'no such item exist' });
        }
        else {
            return res.json({ message: 'item updated' });
        }
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            res.json(err.message);
        }
}


module.exports= {postCompanyDetailsController,getCompanyDetailsController,updateCompanyDetailsController};