import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaEntity } from '../entities/area.entity';

@Injectable()
export class AreaService {
    constructor(@InjectRepository(AreaEntity) private readonly areaEntity: Repository<AreaEntity>) { }

    async getAll(): Promise<AreaEntity[]> {
        let res = await this.areaEntity.find();

        return res;
    }
}