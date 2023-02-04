
const controllers = require('../src/controllers/controllers.js');
const services = require('../src/services/services.js');

    describe('controller testing to get company data', () => {
        it('should return all tasks', async () => {
            jest.spyOn(services, 'storeCompanyDetails').mockResolvedValue([{
                "id": "ad36a7f5-7630-496e-8628-e70981179668",
                "name": "Company ABC",
                "score": 67.45,
            }, {
                "id": "f6827fd2-656b-4264-b0cf-f449ab7a131d",
                "name": "Company DEF",
                "score": 52.45,
            }]);
            const mockreq = {};
            const mockres = {
                send: jest.fn()
            };
            await controllers.postCompanyDetailsController(mockreq, mockres);
            expect(mockres.send).toHaveBeenCalledWith([{
                "id": "ad36a7f5-7630-496e-8628-e70981179668",
                "name": "Company ABC",
                "score": 67.45,
            }, {
                "id": "f6827fd2-656b-4264-b0cf-f449ab7a131d",
                "name": "Company DEF",
                "score": 52.45,
            }]);
        });
    });

    describe('controller testing to get company data', () => {
        it('should return all tasks', async () => {
            jest.spyOn(services, 'getCompanyDetailsInRankingOrder').mockResolvedValue([
                {
                    "id": 2,
                    "companyName": "Apple",
                    "ceoName": "Miss Julie Effertz",
                    "companyScore": "29.987724999999998",
                    "companySector": "Software",
                    "createdAt": "2023-02-03T09:46:02.622Z",
                    "updatedAt": "2023-02-03T09:46:02.622Z"
                },
                {
                    "id": 4,
                    "companyName": "Google",
                    "ceoName": "Caleb Lindgren DVM",
                    "companyScore": "13.27365",
                    "companySector": "Software",
                    "createdAt": "2023-02-03T09:46:08.563Z",
                    "updatedAt": "2023-02-03T09:46:08.563Z"
                }]);
            const mockreq = {query:{
                sector:"Software"
            }};
            const mockres = {
                send: jest.fn()
            };
            await controllers.getCompanyDetailsController(mockreq, mockres);
            expect(mockres.send).toHaveBeenCalledWith([
                {
                    "id": 2,
                    "companyName": "Apple",
                    "ceoName": "Miss Julie Effertz",
                    "companyScore": "29.987724999999998",
                    "companySector": "Software",
                    "createdAt": "2023-02-03T09:46:02.622Z",
                    "updatedAt": "2023-02-03T09:46:02.622Z"
                },
                {
                    "id": 4,
                    "companyName": "Google",
                    "ceoName": "Caleb Lindgren DVM",
                    "companyScore": "13.27365",
                    "companySector": "Software",
                    "createdAt": "2023-02-03T09:46:08.563Z",
                    "updatedAt": "2023-02-03T09:46:08.563Z"
                }]);
        });
    });

    describe('controller testing to update company data', () => {
        it('should update company details', async () => {
            jest.spyOn(services, 'updateCompanyDetailsInDb').mockResolvedValue(1);
            const mockreq = {params:{
                id:1
            },body:{
                ceo:'Nikhar'
            }};
            const mockres = {
                json: jest.fn()
            };
            await controllers.updateCompanyDetailsController(mockreq, mockres);
            expect(mockres.json).toHaveBeenCalledWith({message:"item updated"});
        });
    });

    