import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class LabelEntity extends BaseEntity {
    @PrimaryColumn({ type: 'numeric' })
    label_id: number;

    @Column({ type: 'varchar' })
    label_name: string;
}