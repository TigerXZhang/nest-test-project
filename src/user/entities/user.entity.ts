import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm'

@Entity()
export class Users {
    //自增列
    @PrimaryGeneratedColumn("uuid")
    NotesID:string
    
    //普通列
    @Column()
    StaffID:string

    @Column()
    Country:string

    @Column()
    ChineseName:string
}