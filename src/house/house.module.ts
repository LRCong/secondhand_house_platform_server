import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { LabelService } from './label.service';
import { AreaService } from './area.service';
import { StarService } from './star.service';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseEntity } from '../entities/secondhandle_house.entity';
import { AreaEntity } from '../entities/area.entity';
import { ConsumerInfoEntity } from '../entities/consumerInfo.entity';
import { ManagerEntity } from '../entities/manager.entity'
import { LabelEntity } from '../entities/label.entity';
import { ObtainEntity } from '../entities/obtain.entity';
import { StarEntity } from '../entities/star.entity';
import { OrderEntity } from '../entities/order.entity';
import { MessageEntity } from '../entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    HouseEntity, AreaEntity, ConsumerInfoEntity, ManagerEntity, LabelEntity, ObtainEntity, StarEntity, OrderEntity, MessageEntity
  ])],
  controllers: [HouseController],
  providers: [HouseService, LabelService, AreaService, StarService, MessageService],
})
export class HouseModule { }
