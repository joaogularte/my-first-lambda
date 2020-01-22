const { handler } = require('./index');

describe('create-book', () => {
    test('Should create a book', async () => {
        const body = {
            name: 'book name',
            description: 'book description',
            author: 'john'
        }
        const payload = {
            body: JSON.stringify(body)
        };
        const response =  await handler(payload);
        expect(response).toHaveProperty('statusCode', 200);
        expect(JSON.parse(response.body)).toHaveProperty('name', body.name);
        expect(JSON.parse(response.body)).toHaveProperty('description', body.description);
        expect(JSON.parse(response.body)).toHaveProperty('author', body.author);
        expect(JSON.parse(response.body)).toHaveProperty('_id');
    })

    test('Should fail when create a book', async () => {
        const body = {
            description: 'book desc',
            author: 'john'
        }
        const payload = {
            body: JSON.stringify(body)
        }

        const response = await handler(payload);
        expect(response).toHaveProperty('statusCode', 400);
        expect(JSON.parse(response.body)).toHaveProperty('message', 'Insufficient attributes')
    })
})