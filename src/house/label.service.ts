import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabelEntity } from '../entities/label.entity';

@Injectable()
export class LabelService {
    constructor(
        @InjectRepository(LabelEntity) private readonly labelEntity: Repository<LabelEntity>,
    ) { }

    async getAll(): Promise<LabelEntity[]> {
        let labels = await this.labelEntity.find();
        return labels;
    }
}