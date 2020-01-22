const { MongoClient } =  require('mongodb');
const MongoURI = process.env.MONGO_URI;

exports.handler = async (event) => {
    const {name, description, author} = JSON.parse(event.body);
    
    if(!name || !description || !author) return {
        statusCode: 400, 
        body: JSON.stringify({message: 'Insufficient attributes'})
    }   
    
    const connection = await MongoClient.connect(MongoURI, { useNewUrlParser: true, poolSize:10, useUnifiedTopology: true } )
    const db = connection.db('first-lambda');
    const colletion = db.collection('books');


    try{
        console.log(name, description, author)
        const response = await colletion.insertOne({name, description, author });
        await connection.close();
        return {
            statusCode: 200,
            body: JSON.stringify(response.ops[0])
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error when inserting book on database' })
        }
    }

}