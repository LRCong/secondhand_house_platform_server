import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class HouseEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    house_id: number;

    @Column({ type: 'numeric', name: 'area_id' })
    area_id: number;

    @Column({ type: 'numeric', name: 'manager_id' })
    manager_id: number;

    @Column({ type: 'varchar', name: 'house_name' })
    house_name: string;

    @Column({ type: 'numeric', name: 'house_price' })
    house_price: number;

    @Column({ type: 'numeric', name: 'house_cover' })
    house_cover: number;

    @Column({ type: 'numeric', name: 'house_age' })
    house_age: number;
}
