const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;
        const products = await Product.paginate({}, { page, limit: 10 });
        return response.json(products);
    },

    async show(request, response) {
        console.log(request.params.id);
        const product = await Product.findById(request.params.id);
        return response.json(product);
    },

    async insert(request, response) {
        const { title, description, url } = request.body;
        const product = await Product.create({
            title,
            description,
            url
        });
        
        return response.status(201).json(product);
    },

    async update(request, response) {
        const product = await Product.findByIdAndUpdate(
            request.params.id, 
            request.body, 
            { new: true }
        );
        return response.json(product);
    },

    async delete(request, response) {
        const product = await Product.findByIdAndRemove(request.params.id);
        return response.json({ message: 'Produto removido com sucesso.' });
    }

}