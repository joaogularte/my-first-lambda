const { MongoClient } = require('mongodb');
const MongoURI = process.env.MONGO_URL;

let Connection = null;

const getConnection =  async (dbName) => {
    const connection = await MongoClient.connect(MongoURI, { useNewUrlParser: true, poolSize:10, useUnifiedTopology: true } )
    const db = connection.db(dbName);
    Connection = db;
    return Connection;
}

exports.insertOne = async (collection, data) => {
    const db = await getConnection('first-lambda');
    return await db.collection(collection).insertOne(data);
}