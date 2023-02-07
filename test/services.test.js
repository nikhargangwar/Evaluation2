const services = require('../src/services/services.js');
const { HTTPError } = require('../src/utils/httperror.js');
const db = require('../models');

describe('service testing to get company data', () => {
    it('should return all tasks', async () => {
        const testCode =[{"dataValues":{
            id: 1,
            companyName: 'apple',
            ceoName: 'nikhar',
            companyScore: 23.45,
            companySector: 'software',
        }}];
        jest.spyOn(db.CompanyDetails, 'findAll').mockResolvedValue(testCode
        );
        const mockreq ="Software";
        const mockres = {
            send: jest.fn()
        };

        const result = await services.getCompanyDetailsInRankingOrder(mockreq);
        expect(result).toBe(
            testCode
        );
    });
})


describe('service testing to get company data', () => {
    it('should update given tasks', async () => {
      
        jest.spyOn(db.CompanyDetails, 'update').mockResolvedValue([1]
        );
     
        const mockreq = {
             params: {
                id: 1,
            },body: { ceoName: 'gopal' }
        };

        const result = await services.updateCompanyDetailsInDb(mockreq);
        expect(result).toEqual(
            [1]
        );
    });
})


// describe('service testing to get company data', () => {
//     it('should throw error message if no such id exist', async () => {
// const err = new HTTPError(404, 'No such company found');

//         jest.spyOn(db.CompanyDetails, 'update').mockRejectedValue(
//                [0]
//             );
//         const mockreq = {
//              params: {
//                 id: 143
//             },body: { ceoName: 'gopal' }
//         };

//         const mockres = {
//             status:jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };

//         await services.updateCompanyDetailsInDb(mockreq);

//         expect(mockres.status).toHaveBeenCalledWith(404);       
//         expect(mockres.json).toHaveBeenCalledWith({message:"No such company found"});
      
        
//     });
// })