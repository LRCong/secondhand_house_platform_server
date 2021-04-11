import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class ManagerEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    manager_id: number;

    @Column({ type: 'varchar' })
    manager_name: string;

    @Column({ type: 'varchar' })
    manager_pw: string;
}