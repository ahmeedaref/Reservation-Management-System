import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepo } from './schemas/UserRepo';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    exports: [MongooseModule, UserRepo],
    providers: [UserRepo]

})
export class UsersModule { }
