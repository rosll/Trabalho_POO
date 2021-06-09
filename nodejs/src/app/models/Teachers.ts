import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('teachers')
class Teacher {
  @PrimaryColumn()
  id: string;

  @Column()
  disciplina: string;

  @Column()
  professor: string;

  @Column()
  diasemana: string;

  @Column()
  periodo: string;

  @Column()
  horario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Teacher;
