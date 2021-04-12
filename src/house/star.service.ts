import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarEntity } from '../entities/star.entity';
import { OrderEntity } from '../entities/order.entity';
import { HouseEntity } from '../entities/secondhandle_house.entity';
import { ManagerEntity } from '../entities/manager.entity';
import { HouseInfoLite } from './dto/filter.dto';

@Injectable()
export class StarService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderEnity: Repository<OrderEntity>,
        @InjectRepository(StarEntity) private readonly starEnity: Repository<StarEntity>,
        @InjectRepository(HouseEntity) private readonly entity: Repository<HouseEntity>,
        @InjectRepository(ManagerEntity) private readonly managerEntity: Repository<ManagerEntity>
    ) { }

    async getStar(consumer_id: number): Promise<HouseInfoLite[]> {
        let houses: HouseEntity[] = await this.starEnity.find({ consumer_id: consumer_id })
            .then(res => Promise.all(res.map(value => this.entity.findOne({ house_id: value.house_id }))));
        return Promise.all(houses.map(async value => ({
            house_name: value.house_name,
            house_id: value.house_id,
            manager_name: (await this.managerEntity.findOne({ manager_id: value.manager_id })).manager_name,
            ifStar: (await this.starEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
            ifOrder: (await this.orderEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
        })))
    }

    async getOrder(consumer_id: number): Promise<HouseInfoLite[]> {
        let houses: HouseEntity[] = await this.orderEnity.find({ consumer_id: consumer_id })
            .then(res => Promise.all(res.map(value => this.entity.findOne({ house_id: value.house_id }))));
        return Promise.all(houses.map(async value => ({
            house_name: value.house_name,
            house_id: value.house_id,
            manager_name: (await this.managerEntity.findOne({ manager_id: value.manager_id })).manager_name,
            ifStar: (await this.starEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
            ifOrder: (await this.orderEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
        })))
    }

    async addStar(consumer_id: number, house_id: number): Promise<any> {
        if ((await this.starEnity.count({ consumer_id, house_id })) > 0) return this.starEnity.delete({ consumer_id, house_id });
        let newEntity = new StarEntity();
        newEntity.consumer_id = consumer_id;
        newEntity.house_id = house_id;
        return newEntity.save();
    }

    async addOrder(consumer_id: number, house_id: number): Promise<any> {
        if ((await this.starEnity.count({ consumer_id, house_id })) > 0) return this.starEnity.delete({ consumer_id, house_id });
        let newEntity = new OrderEntity();
        newEntity.consumer_id = consumer_id;
        newEntity.house_id = house_id;
        return newEntity.save();
    }
}