import { Chalan } from 'src/modules/chalans/entites/chalan.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

@Entity('ac_service_details')
export class AcServiceDetails {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  // Service Details
  @Column({ name: 'asset_code' })
  assetCode: string;

  @Column({ name: 'ton', type: 'int' })
  ton: number;
  
  @Column({ name: 'item_description' })
  itemDescription: string;
  
  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // Relations
  @ManyToOne(() => Chalan, (chalan) => chalan.acServices, { onDelete: 'CASCADE' })
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