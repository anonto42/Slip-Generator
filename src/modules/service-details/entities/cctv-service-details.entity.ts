import { Chalan } from 'src/modules/chalans/entites/chalan.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('cctv_service_details')
export class CctvServiceDetails {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  // Details
  @Column({ name: 'asset_code', type: 'varchar', length: 100 })
  assetCode: string;

  @Column({ name: 'camera_type', type: 'varchar', length: 50 })
  cameraType: string;

  @Column({ name: 'resolution', type: 'varchar', length: 50 })
  resolution: string;

  @Column({ name: 'lens', type: 'varchar', length: 50, nullable: true })
  lens: string;

  @Column({ name: 'recording_type', type: 'varchar', length: 50, nullable: true })
  recordingType: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'installation_required', type: 'boolean', default: true })
  installationRequired: boolean;

  @Column({ name: 'warranty_months', type: 'int', nullable: true })
  warrantyMonths?: number;

  // Relations
  @ManyToOne(() => Chalan, (chalan) => chalan.cctvServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chalan_id' })
  chalan: Chalan;

  // Timestamps
  @CreateDateColumn()
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @UpdateDateColumn()
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
