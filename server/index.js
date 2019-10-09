require('dotenv').config()
const express = require('express');
const massive = require('massive');
const products_controller = require("./products_controller");

const app = express();
app.use(express.json());

const {SERVER_PORT , CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
})
.catch(err => console.log(err));

app.post('/api/prodcuts', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products', products_controller.getOne);
app.put('/api/products', products_controller.update);
app.delete('/api/products', products_controller.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
});