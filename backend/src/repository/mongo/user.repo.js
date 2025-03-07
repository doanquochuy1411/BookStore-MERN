// const User = require("../../users/user.model")

// class UserRepo extends BaseUserRepo{
//     constructor(model) {
//         super();
//     }

//     async getAllUser(){
//         try {
//             return await this.model.find();
//         } catch (error) {
//             throw new Error(`Lỗi khi lấy danh sách người dùng: ${error.message}`);
//         }
//     }
    
//     async getUserByID(){
//         try {
//             return await this.model.findById(id);
//         } catch (error) {
//             throw new Error(`Lỗi khi lấy người dùng theo ID: ${error.message}`);
//         }
//     }
    
//     async createUser(user){
//         try {
//             return await this.model.create(user);
//         } catch (error) {
//             throw new Error(`Lỗi khi tạo người dùng: ${error.message}`);
//         }
//     }
// }