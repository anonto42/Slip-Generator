import { Gender } from 'src/common/enums/gender.enum';
import { Branch } from 'src/modules/branches/entites/branch.entity';
import { Chalan } from 'src/modules/chalans/entites/chalan.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('engineers')
export class Engineer {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

   // Personal Info
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({
      type: 'enum',
      enum: Gender,
      default: Gender.MALE,
    })
  gender?: Gender;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zipCode?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  // Job Info
  @Column({ type: 'varchar', length: 100, nullable: true })
  position?: string; 

  @Column({ type: 'varchar', length: 50, nullable: true })
  employeeCode?: string; 

  @Column({ type: 'varchar', length: 100, nullable: true })
  department?: string;

  @Column({ type: 'date', nullable: true })
  hireDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary?: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  
  // Relations
  @ManyToOne(() => Branch, branch => branch.engineers, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToMany(() => Chalan, chalan => chalan.engineer)
  chalans: Chalan[];

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
