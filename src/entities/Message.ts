import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("messages")
export class Message {
  @PrimaryColumn({ name: "id" })
  id: string;

  @Column()
  admin_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
