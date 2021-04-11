import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class ObtainEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    house_id: number;

    @PrimaryColumn({ type: 'numeric' })
    label_id: number;
}