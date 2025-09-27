import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, 
    ProductModule, 
    BlogModule, 
    AuthModule, 
    UserModule, CategoryModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
