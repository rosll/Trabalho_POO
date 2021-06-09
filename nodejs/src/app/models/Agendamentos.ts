/*
Agendamentos
muitos agendamentos pode ter um usuario - ManyToOne

Usuarios
um usuário tem muitos agendamentos - OneToMany

*/

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuarios from './Usuarios';

@Entity('agendamentos')
class Agendamentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prestador_servico_id: string;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'prestador_servico_id' })
  prestador_servico: Usuarios;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Agendamentos;
