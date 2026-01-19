import { Module } from '@nestjs/common';
import { ChalansController } from './chalans.controller';
import { ChalansService } from './chalans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chalan } from './entites/chalan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chalan])],
  controllers: [ChalansController],
  providers: [ChalansService],
})
export class ChalansModule {}
