import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Author } from "./Author";
import { Category } from "./Category";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  text!: string;

  @ManyToMany((type) => Category, {
    cascade: true
  })
  @JoinTable()
  categories!: Category[];

  @Column({ nullable: true })
  authorId?: number;

  @JoinColumn({ name: "authorId" })
  @ManyToOne(() => Author, (author) => author.posts, {
    nullable: true
  })
  author?: Author;
}
