import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Region } from './region.entity';
import { Engineer } from 'src/modules/engineers/entities/engineer.entity';
import { Chalan } from 'src/modules/chalans/entites/chalan.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Relations
  @ManyToOne(() => Region, region => region.branches)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @OneToMany(() => Chalan, chalan => chalan.branch)
  chalans: Chalan[];
  
  @OneToMany(() => Engineer, engineer => engineer.branch)
  engineers: Engineer[];

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
