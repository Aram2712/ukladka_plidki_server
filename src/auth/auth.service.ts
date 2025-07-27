import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './signin.dto';
import { SignupDto } from './signup.dto';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>,
  ) {}

  async signUp(user: SignupDto) {
    const findUser = await this.authEntity.findOneBy({
      phoneNumber: user.phoneNumber,
    });
    console.log(findUser)
    if (findUser) {
      return ;
    }
    else {
      const newUser = this.authEntity.create({ ...user });
      await this.authEntity.save(newUser);
      return newUser;
    }
  }

  async signIn(user: SignInDto): Promise<AuthEntity | undefined> {
    const findUser = await this.authEntity.findOneBy({
      phoneNumber: user.phoneNumber,
    });
    if (findUser) {
      return findUser;
    }
  }

  async getAllUsers(): Promise<AuthEntity[]> {
    return this.authEntity.find();
  }

  async deleteUser(id: number) {
    return this.authEntity.delete(id);
  }
}
