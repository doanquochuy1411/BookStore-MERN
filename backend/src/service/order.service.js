class OrderService{
    constructor(orderRepo){
        this.orderRepo = orderRepo;
    }

    async createOrder(orderData) {
        return await this.orderRepo.createOrder(orderData);
    }

    async getOrderByEmail(email) {
        return await this.orderRepo.getOrderByEmail(email);
    }
}

module.exports = OrderService;