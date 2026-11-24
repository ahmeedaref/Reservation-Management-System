import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepo } from './UserRepo';
import { updateUserDto } from './DTOs/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepo) { }
    async findAll() {
        return this.userRepo.findAll();
    }

    async findUserById(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new NotFoundException('User Not found');
        }
        return user;
    }

    async GetProfile(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            console.log(user)
            throw new NotFoundException('User Not found');
        }
        return user;
    }

    async updateUser(id: string, data: updateUserDto) {
        try {
            const user = await this.userRepo.findById(id);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const updatedUser = await this.userRepo.updateUser(id, data);
            return updatedUser;
        } catch (err) {
            throw new BadRequestException(err)

        }
    }

    async updateUserStatus(id: string, isActive: boolean) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new NotFoundException('User Not found ')
        }
        return this.userRepo.updateUserStatus(id, isActive)

    }
}
