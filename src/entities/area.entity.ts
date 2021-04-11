import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class AreaEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric', name: 'area_id' })
    area_id: number;

    @Column({ type: 'varchar' })
    area_name: string;
}