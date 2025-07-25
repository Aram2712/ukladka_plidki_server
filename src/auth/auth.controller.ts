import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { SignupDto } from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  async signUpr(@Body() body: SignupDto) {
    return this.authService.signUp(body);
  }

  @Get('users')
  async getUsers() {
    return this.authService.getAllUsers();
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
