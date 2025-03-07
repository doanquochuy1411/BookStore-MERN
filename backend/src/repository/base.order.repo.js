class BaseOrderRepo{
    constructor(model) {
        this.model = model;
    }

    async createOrder(order) {
        throw new Error("Method 'createOrder()' must be implemented.");
    }
    
    async getOrderByEmail(email) {
        throw new Error("Method 'getOrderByEmail()' must be implemented.");
    }
}

module.exports = BaseOrderRepo;