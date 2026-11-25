import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { updateUserDto } from "./DTOs/updateUser.dto";
@Injectable()
export class UserRepo {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async create(Data: Partial<User>): Promise<UserDocument> {
        return this.userModel.create(Data)
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findAll() {
        return this.userModel.find();
    }

    async updateUser(id: string, data: Partial<User>): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(id, { $set: data },
            { new: true, runValidators: true })
    }

    async updateUserStatus(id: string, isActive: boolean) {
        return this.userModel.findByIdAndUpdate(id, { $set: { isActive } },
            { new: true, runvalidation: true })
    }

}