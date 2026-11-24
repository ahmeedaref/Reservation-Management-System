import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
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

}