import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiResponseHelper } from 'src/common/helper/apiResponse.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return ApiResponseHelper.success(
      'Register successful',
      await this.authService.register(registerDto),
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return ApiResponseHelper.success(
      'Login successful',
      await this.authService.login(loginDto),
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return ApiResponseHelper.success(
      'Profile',
      this.authService.getProfile(req.user.id),
    );
  }
}
