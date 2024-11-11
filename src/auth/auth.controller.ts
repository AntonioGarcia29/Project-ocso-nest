import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-User.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  signUp(@Body()CreateUserDto:CreateUserDto){
    return this.authService.registerUser(CreateUserDto)
  }
  @Post("login")
  login(@Body() LoginUserDto:LoginUserDto){
    return this.authService.loginUser(LoginUserDto)
  }
}
