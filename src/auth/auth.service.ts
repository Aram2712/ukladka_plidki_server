
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from "./signin.dto";
import { SignupDto } from "./signup.dto";
import { AuthEntity } from "./auth.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>) {}

    async signUp (user: SignupDto) {
        const findUser = await this.authEntity.findOneBy({ phoneNumber: user.phoneNumber });
        if (findUser) {
            return 'User already exists';
        }
        else {
            const newUser = this.authEntity.create({ ...user });
            await this.authEntity.save(newUser);
        }
    }

    async signIn (user: SignInDto): Promise<AuthEntity | UnauthorizedException> {
        const findUser = await this.authEntity.findOneBy({ phoneNumber: user.phoneNumber });
        if (findUser) {
            return findUser;
        }
        else {
            return new UnauthorizedException('User not found');
        }
    }

    async getAllUsers (): Promise<AuthEntity[]> {
        return this.authEntity.find();
    }
    
    async deleteUser (id: number) {
        return this.authEntity.delete(id)
    }
}
