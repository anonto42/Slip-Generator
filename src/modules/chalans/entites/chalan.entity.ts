import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Engineer } from 'src/modules/engineers/entities/engineer.entity';
import { Branch } from 'src/modules/branches/entites/branch.entity';
import { ServiceType } from 'src/common/enums/service.enum';
import { AcServiceDetails } from 'src/modules/service-details/entities/ac-service-details.entity';
import { CctvServiceDetails } from 'src/modules/service-details/entities/cctv-service-details.entity';

@Entity('chalans')
export class Chalan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Fields
  @Column({ name: 'date_of_work', type: 'date' })
  dateOfWork: Date;

  @Column({ name: 'service_type', type: 'enum', enum: ServiceType, nullable: false })
  serviceType: ServiceType;

  @Column({ name: 'service_details', type: 'json', nullable: true })
  serviceDetails: any;

  // Relations
  @OneToMany(() => AcServiceDetails, (ac) => ac.chalan, { cascade: true })
  acServices: AcServiceDetails[];

  @OneToMany(() => CctvServiceDetails, (cctv) => cctv.chalan, { cascade: true })
  cctvServices: CctvServiceDetails[];

  @ManyToOne(() => Engineer, engineer => engineer.chalans, { nullable: false })
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => Branch, branch => branch.chalans, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  // Timestamps
  @CreateDateColumn()
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
