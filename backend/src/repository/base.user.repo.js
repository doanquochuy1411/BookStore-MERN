const User = require("../../users/user.model")

class BaseUserRepo{
    constructor() {
        this.model = User;
    }

    async getAllUser(){
        throw new Error("Method 'getAllUser()' must be implemented.");
    }
    
    async getUserByID(){
        throw new Error("Method 'getUserByID()' must be implemented.");
    }
    
    async createUser(){
        throw new Error("Method 'createUser()' must be implemented.");
    }
}