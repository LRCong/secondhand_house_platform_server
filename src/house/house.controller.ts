import { Controller, Get, Post, Body } from '@nestjs/common';
import { HouseService } from './house.service';
import { AreaService } from './area.service';
import { LabelService } from './label.service';
import { FilterHouseDto } from './dto/filter.dto';
import { HouseEntity } from '../entities/secondhandle_house.entity';
import { AreaEntity } from 'src/entities/area.entity';
import { LabelEntity } from 'src/entities/label.entity';

@Controller('house')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    private readonly labelService: LabelService,
    private readonly areaService: AreaService
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
}
