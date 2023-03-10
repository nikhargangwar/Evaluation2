
const axios = require('axios');
const db = require('../../models');
// const  {HTTPError} = require('../utils/httperror.js');
const { HTTPError } = require('../../src/utils/httperror.js')
const storeCompanyDetails = async () => {

    const companySectorCsvData = await axios.get('https://store-0001.s3.amazonaws.com/input.csv');
    const companySectorCsvDataString = companySectorCsvData.data;
    const companySectorCsvDataArray = companySectorCsvDataString.split('\n');
    const companySectorCsvDataArrayLength = companySectorCsvDataArray.length;

    for (let i = 1; i < companySectorCsvDataArrayLength; i++) {
        const companySectorCsvDataArrayElement = companySectorCsvDataArray[i];
        const companySectorCsvDataArrayElementArray = companySectorCsvDataArrayElement.split(',');
        const companyId = companySectorCsvDataArrayElementArray[0];
        const companySector = companySectorCsvDataArrayElementArray[1];


        companyDetailsById = await axios.get('http://54.167.46.10/company/' + companyId);
        const companyName = companyDetailsById.data.name;
        const companyCeo = companyDetailsById.data.ceo;


        companyDetailsBySector = await axios.get('http://54.167.46.10/sector?name=' + companySector);
        let companyScore = 0;

        companyDetailsBySector.data.map((company) => {
            if (company.companyId === companyId) {
                companyScore = ((company.performanceIndex[0].value * 10) + (company.performanceIndex[1].value / 10000) + (company.performanceIndex[2].value * 10) + (company.performanceIndex[3].value)) / 4;
            }
        });

        const result = await db.CompanyDetails.create({
            companyName: companyName,
            ceoName: companyCeo,
            companyScore: companyScore,
            companySector: companySector
        });


    }

    const resultCompanyData = await db.CompanyDetails.findAll({ attributes: ['id', 'companyName', 'companyScore'] });

    if (resultCompanyData.length === 0) {
        throw new HTTPError(404, 'database is empty');
    }

    return resultCompanyData;

};


const getCompanyDetailsInRankingOrder = async (sector) => {
    const resultCompanyData = await db.CompanyDetails.findAll({ where: { companySector: sector }, order: [['companyScore', 'DESC']] }, { attributes: ['id', 'companyName', 'companyScore'] });
    if (resultCompanyData.length === 0) {
        throw new HTTPError(404, 'No such company with given sector found');
    }

    resultCompanyData.forEach((element, index) => {
        element.dataValues.rank = index + 1;
    });

    return resultCompanyData;
}


const updateCompanyDetailsInDb = async (companyId, ceoName) => {
    const resultCompanyData = await db.CompanyDetails.update({ ceoName: ceoName }, {
        where: {
            id: companyId
        }
    });

    if (resultCompanyData[0] === 0) {
        throw new HTTPError(404, 'No such company found');
    }

    return resultCompanyData;
}
module.exports = { storeCompanyDetails, getCompanyDetailsInRankingOrder, updateCompanyDetailsInDb };
