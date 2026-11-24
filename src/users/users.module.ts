import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepo } from './UserRepo';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    exports: [MongooseModule, UserRepo, UsersService],
    providers: [UserRepo, UsersService],
    controllers: [UsersController]

})
export class UsersModule { }
