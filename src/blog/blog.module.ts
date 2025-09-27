import { Global, Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { blogProviders } from './blog.providers';

@Global()
@Module({
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders],
})
export class BlogModule {}
