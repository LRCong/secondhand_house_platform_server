import { Column, Entity, PrimaryColumn, BaseEntity, Index } from 'typeorm';

@Entity()
export class MessageEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    message_id: number;

    @Column({ type: 'numeric' })
    consumer_id: number;

    @Column({ type: 'numeric' })
    manager_id: number;

    @Column({ type: 'varchar' })
    message_content: string;

    // @Index()
    @Column({ type: 'date' })
    message_date: Date;
}