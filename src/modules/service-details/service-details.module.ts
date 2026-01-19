import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcServiceDetails } from './entities/ac-service-details.entity';
import { CctvServiceDetails } from './entities/cctv-service-details.entity';
import { ServiceDetailsService } from './service-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AcServiceDetails,
      CctvServiceDetails
    ])
  ],
  providers: [ServiceDetailsService],
  exports: [ServiceDetailsService]
})
export class ServiceDetailsModule {}
