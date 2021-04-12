import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class OrderEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    house_id: number;

    @PrimaryColumn({ type: 'numeric' })
    consumer_id: number;
}