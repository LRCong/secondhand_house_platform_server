import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class ConsumerInfoEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    consumer_id: number;

    @Column({ type: 'varchar' })
    consumer_name: string;

    @Column({ type: 'varchar' })
    consumer_pw: string;
}