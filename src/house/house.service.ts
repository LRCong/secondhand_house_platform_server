import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HouseEntity } from '../entities/secondhandle_house.entity';
import { ObtainEntity } from '../entities/obtain.entity';
import { FilterHouseDto, HouseInfoLite } from './dto/filter.dto';
import { ManagerEntity } from '../entities/manager.entity';
import { StarEntity } from '../entities/star.entity';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class HouseService {

  constructor(
    @InjectRepository(HouseEntity) private readonly entity: Repository<HouseEntity>,
    @InjectRepository(ObtainEntity) private readonly obtainEntity: Repository<ObtainEntity>,
    @InjectRepository(OrderEntity) private readonly orderEnity: Repository<OrderEntity>,
    @InjectRepository(StarEntity) private readonly starEnity: Repository<StarEntity>,
    @InjectRepository(ManagerEntity) private readonly managerEntity: Repository<ManagerEntity>
  ) { }

  async getFilterHouse(filterHouseDto: FilterHouseDto): Promise<string> {
    let houses = await this.entity
      .createQueryBuilder('house_entity')
      .where('house_entity.house_price >= :minPrice and house_entity.house_price <= :maxPrice', filterHouseDto)
      .andWhere('house_entity.house_cover >= :minCover and house_entity.house_cover <= :maxCover', filterHouseDto)
      .andWhere('house_entity.house_age >= :minAge and house_entity.house_age <= :maxAge', filterHouseDto)
      .getMany();
    let labels = [];
    if (filterHouseDto.label.length > 0) {
      labels = await this.obtainEntity.find();
      labels = labels.filter(value => filterHouseDto.label.indexOf(Number(value.label_id)) >= 0).map(value => Number(value.house_id));
    }
    let res: HouseInfoLite[] = await Promise.all(houses
      .filter(value => filterHouseDto.Area.indexOf(Number(value.area_id)) >= 0)
      .filter(value => labels.indexOf(Number(value.house_id)) >= 0)
      .map(async (value) => ({
        house_id: value.house_id,
        house_name: value.house_name,
        manager_name: (await this.managerEntity.findOne({ manager_id: value.manager_id })).manager_name,
        ifStar: (await this.starEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
        ifOrder: (await this.orderEnity.count({ consumer_id: 1, house_id: value.house_id })) >= 1,
      })));


    return JSON.stringify(res);
  }

  async create(): Promise<HouseEntity[]> {
    let res = [];

    let maps1 = [1, 3, 2, 1];

    let maps2 = ['金庸阁', '伯灵天瑞', '泊寓', '平山村'];

    let maps3 = [5000, 7000, 4000, 6000];

    let maps4 = [120, 200, 80, 140];

    let maps5 = [10, 15, 5, 7];

    this.entity.delete({});

    for (let i = 0; i < 4; i++) {
      let newEntity = new HouseEntity();

      newEntity.house_id = i + 1;
      newEntity.area_id = maps1[i];
      newEntity.manager_id = 1;
      newEntity.house_name = maps2[i];
      newEntity.house_price = maps3[i];
      newEntity.house_cover = maps4[i];
      newEntity.house_age = maps5[i];

      res.push(await newEntity.save());
    }

    return res;
  }
}
