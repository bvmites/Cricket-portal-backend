const router = require ('express').Router();

const cricSchema = require('../../Schema/cricSchema');
const cricUpdateSchema = require('../../Schema/cricUpdateSchema');

module.exports = (db) => {

    const Cric = require('../../db/cric')(db);
    const Validator = require('jsonschema').Validator;
    const validator = new Validator();
    //POST /create
    router.post('/', async (request, response) => {
        const myCric = request.body;
        try{
            const error = new Error();
            if(!validator.validate(myCric, cricSchema).valid){
                error.message = 'invalid request';
                error.code = 'ValidationException';
                throw error;
            }
            const result = await Cric.create(myCric);
            response.status(200).json({'message': "Cricketer Created!"});
        }catch (e) {
            if(e.code === 'ValidationException'){
                response.status(405).json({message: e.message})
            }else{
                response.status(500).json({message: e.message});
            }
        }
    });

    //GET /getall
    router.get('/getall', async (request, response) => {
        try{
            let res = await Cric.getAll().toArray();
            console.log(res);
            response.status(200).json(res);
        }catch (e) {
            console.log(e.message);
            response.status(500).json({message: e.message});
        }
    });

    //DELETE /:id
    router.delete('/:id', async (request, response) => {
        try {
            const deleted = await Cric.delete_one(request.params.id);
            // console.log(deleted);
            if (deleted.deletedCount) {
                response.status(200).json({message: "Cricketer deleted!"});
            } else {
                response.status(404).json({message: 'Cricketer not found'});
            }
        } catch (e) {
            console.log(e.message);
            response.status(200).json({message: 'not deleted'});
        }
    });

    return router;

};