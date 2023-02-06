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