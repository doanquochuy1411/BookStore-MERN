const BaseOrderRepo = require("../base.order.repo");

class OrderRepo extends BaseOrderRepo{
    constructor(model) {
        super(model);
    }

    async createOrder(order) {
        try {
            return await this.model.create(order);
        } catch (error) {
            throw new Error(`Lỗi khi tạo đơn hàng: ${error.message}`);
        }
    }

    async getOrderByEmail(email) {
        try {
            return await this.model.find({ email: email }).sort({createdAt: -1});
        } catch (error) {
            throw new Error(`Lỗi khi lấy đơn hàng theo email: ${error.message}`);
        }
    }
}

module.exports = OrderRepo;