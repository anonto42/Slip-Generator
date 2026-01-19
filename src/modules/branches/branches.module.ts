import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entites/branch.entity';
import { Region } from './entites/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Branch,
      Region
    ])
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
