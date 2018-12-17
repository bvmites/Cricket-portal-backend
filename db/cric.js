const ObjectId = require('mongodb').ObjectID;

module.exports = (db) => ({
    create: (cric) => {
        return db.collection('db').insertOne(cric);
    },
    getAll: () => {
        return db.collection('db').find({});
    },
    delete_one: (id) => {
        return db.collection('db').deleteOne({_id: ObjectId(id)});
    },
    store: (docu) => {
        db.collection('store').remove({});
        return db.collection('store').insertOne(docu);
    },
    get_store: () => {
        return db.collection('store').find({});
    }
});