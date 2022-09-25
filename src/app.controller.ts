import {
  Controller,
  Get,
  NotImplementedException,
  Query,
} from '@nestjs/common';
import { ShelterManager } from './shelter-manager/shelter-manager';
import { FetchCatsDto } from './dto/fetch-cats.dto';
import { FetchSheltersDto } from './dto/fetch-shelters.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application Controller')
@Controller()
export class AppController {
  constructor(private readonly shelterManager: ShelterManager) {}

  @Get('cats')
  getCats(@Query() dto: FetchCatsDto) {
    return this.shelterManager.fetchCats(dto);
  }

  @Get('shelters')
  getShelters(@Query() dto: FetchSheltersDto) {
    return this.shelterManager.fetchShelters(dto);
  }

  @Get('clients')
  getClients() {
    throw new NotImplementedException();
  }
}
