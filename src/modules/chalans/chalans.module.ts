import { Module } from '@nestjs/common';
import { ChalansController } from './chalans.controller';
import { ChalansService } from './chalans.service';

@Module({
  controllers: [ChalansController],
  providers: [ChalansService],
})
export class ChalansModule {}
