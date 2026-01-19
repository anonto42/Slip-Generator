import { Module } from '@nestjs/common';
import { EngineersController } from './engineers.controller';
import { EngineersService } from './engineers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engineer } from './entities/engineer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Engineer])],
  controllers: [EngineersController],
  providers: [EngineersService],
})
export class EngineersModule {}
