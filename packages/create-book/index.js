const mongodb = require('mongodb-handler');

exports.handler = async (event) => {
    const {name, description, author} = JSON.parse(event.body);
    
    //Validação dos atributos de entrada da função
    if(!name || !description || !author) return {
        statusCode: 400, 
        body: JSON.stringify({message: 'Insufficient attributes'})
    }
    
    try{
        const response = await mongodb.insertOne('books', {name, description, author });
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