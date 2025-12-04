import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { userProviders } from 'src/user/user.providers';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    ...userProviders,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
