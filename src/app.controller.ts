import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FetchCatsDto } from './dto/fetch-cats.dto';
import { FetchSheltersDto } from './dto/fetch-shelters.dto';
import { ApiTags } from '@nestjs/swagger';
import { FetchClientsDto } from './dto/fetch-clients.dto';
import { ShelterExplorer } from './shelter-explorer/shelter-explorer';
import { RegisterCatDto } from './dto/register-cat.dto';
import { ShelterManager } from './shelter-manager/shelter-manager';
import { AdoptCatDto } from './dto/adopt-cat.dto';
import { AdoptionManager } from './adoption-manager/adoption-manager';

@ApiTags('Application Controller')
@Controller({ version: '1' })
export class AppController {
  constructor(
    private readonly shelterExplorer: ShelterExplorer,
    private readonly shelterManager: ShelterManager,
    private readonly adoptionManager: AdoptionManager,
  ) {}

  @Get('cats')
  getCats(@Query() dto: FetchCatsDto) {
    return this.shelterExplorer.fetchCats(dto);
  }

  @Get('shelters')
  getShelters(@Query() dto: FetchSheltersDto) {
    return this.shelterExplorer.fetchShelters(dto);
  }

  @Get('clients')
  getClients(@Query() dto: FetchClientsDto) {
    return this.shelterExplorer.fetchClients(dto);
  }

  @Post('registration/:shelterId')
  registerCat(
    @Param('shelterId') shelterId: number,
    @Body() dto: RegisterCatDto,
  ) {
    return this.shelterManager.registerCat(dto, shelterId);
  }

  @Patch('adoption/:catId')
  adoptCat(@Param('catId') catId: number, @Body() dto: AdoptCatDto) {
    return this.adoptionManager.adoptCat(catId, dto);
  }
}
