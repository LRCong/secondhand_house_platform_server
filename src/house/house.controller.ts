import { Controller, Get, Post, Body } from '@nestjs/common';
import { HouseService } from './house.service';
import { AreaService } from './area.service';
import { LabelService } from './label.service';
import { StarService } from './star.service';
import { MessageService } from './message.service';
import { FilterHouseDto, HouseInfoLite } from './dto/filter.dto';
import { HouseEntity } from '../entities/secondhandle_house.entity';
import { AreaEntity } from 'src/entities/area.entity';
import { LabelEntity } from 'src/entities/label.entity';
import { StarEntity } from 'src/entities/star.entity';
import { ManagerEntity } from 'src/entities/manager.entity';
import { MessageEntity } from '../entities/message.entity';

@Controller('house')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    private readonly labelService: LabelService,
    private readonly areaService: AreaService,
    private readonly starService: StarService,
    private readonly messageService: MessageService
  ) { }

  @Get()
  async getHello(): Promise<string> {
    console.log('get')
    return 'hello';
  }

  @Get('create')
  async create(): Promise<HouseEntity[]> {
    return this.houseService.create();
  }

  @Post('getfilter')
  getFilterHouse(@Body() filterHouseDto: FilterHouseDto): Promise<string> {
    console.log(filterHouseDto);
    return this.houseService.getFilterHouse(filterHouseDto);
  }

  @Get('getLabels')
  getLabels(): Promise<LabelEntity[]> {
    return this.labelService.getAll();
  }

  @Get('getAreas')
  getAreas(): Promise<AreaEntity[]> {
    return this.areaService.getAll();
  }

  @Post('addStar')
  addStar(@Body() consumer): Promise<StarEntity> {
    console.log(consumer)
    return this.starService.addStar(consumer.consumer_id, consumer.house_id);
  }

  @Post('addOrder')
  addOrder(@Body() consumer): Promise<StarEntity> {
    console.log(consumer)
    return this.starService.addOrder(consumer.consumer_id, consumer.house_id);
  }

  @Post('getStar')
  getStar(@Body() consumer): Promise<HouseInfoLite[]> {
    return this.starService.getStar(consumer.consumer_id);
  }

  @Post('getOrder')
  getOrder(@Body() consumer): Promise<HouseInfoLite[]> {
    return this.starService.getOrder(consumer.consumer_id);
  }

  @Post('getManager')
  getManager(@Body() consumer): Promise<ManagerEntity[]> {
    return this.messageService.getManager(consumer.consumer_id);
  }

  @Post('getMessage')
  getMessage(@Body() option: any): Promise<MessageEntity[]> {
    return this.messageService.getMessage(option.consumer_id, option.manager_id);
  }

  @Post('sendMessage')
  sendMessage(@Body() option: any): Promise<any> {
    console.log(option)
    return this.messageService.addMessage(
      option.consumer_id,
      option.manager_id,
      option.message_content,
      option.message_date
    )
  }

  @Post('hello')
  hello(@Body() option: any): Promise<any> {
    console.log(option)
    return this.messageService.addMessage(
      option.consumer_id,
      option.manager_id,
      '你好',
      option.message_date
    )
  }
}
