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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FetchClientsDto } from './dto/fetch-clients.dto';
import { ShelterExplorer } from './core/shelter-explorer/shelter-explorer';
import { RegisterCatDto } from './dto/register-cat.dto';
import { ShelterManager } from './core/shelter-manager/shelter-manager';
import { AdoptCatDto } from './dto/adopt-cat.dto';
import { AdoptionManager } from './core/adoption-manager/adoption-manager';
import { FetchAdoptionsDto } from './dto/fetch-adoptions.dto';
import { FetchRegistrationsDto } from './dto/fetch-registrations.dto';
import { PaginatedList } from './infra/infra.types';
import { CatView } from './views/cat.view';
import { ClientView } from './views/client.view';
import { AdoptionView } from './views/adoption.view';
import { RegistrationView } from './views/registration.view';
import { ApiOkResponsePaginated } from './utils/api-ok-response-paginated.decorator';
import { ShelterView } from './views/shelter.view';

@ApiTags('Application Controller')
@Controller({ version: '1' })
export class AppController {
  constructor(
    private readonly shelterExplorer: ShelterExplorer,
    private readonly shelterManager: ShelterManager,
    private readonly adoptionManager: AdoptionManager,
  ) {}

  @Get('cat')
  @ApiOkResponsePaginated(CatView)
  async getCats(@Query() dto: FetchCatsDto): Promise<PaginatedList<CatView>> {
    return this.shelterExplorer.fetchCats(dto);
  }

  @Get('shelter')
  @ApiOkResponsePaginated(ShelterView)
  getShelters(
    @Query() dto: FetchSheltersDto,
  ): Promise<PaginatedList<ShelterView>> {
    return this.shelterExplorer.fetchShelters(dto);
  }

  @Get('client')
  @ApiOkResponsePaginated(ClientView)
  async getClients(
    @Query() dto: FetchClientsDto,
  ): Promise<PaginatedList<ClientView>> {
    return this.shelterExplorer.fetchClients(dto);
  }

  @Get('adoption')
  @ApiOkResponsePaginated(AdoptionView)
  getAdoptions(
    @Query() dto: FetchAdoptionsDto,
  ): Promise<PaginatedList<AdoptionView>> {
    return this.shelterExplorer.fetchAdoptions(dto);
  }

  @Get('registration')
  @ApiOkResponsePaginated(RegistrationView)
  getRegistrations(
    @Query() dto: FetchRegistrationsDto,
  ): Promise<PaginatedList<RegistrationView>> {
    return this.shelterExplorer.fetchRegistrations(dto);
  }

  @Post('registration/:shelterId')
  @ApiCreatedResponse({ type: RegistrationView })
  registerCat(
    @Param('shelterId') shelterId: number,
    @Body() dto: RegisterCatDto,
  ): Promise<RegistrationView> {
    return this.shelterManager.registerCat(dto, shelterId);
  }

  @Patch('adoption/:catId')
  @ApiOkResponse({ type: AdoptionView })
  adoptCat(
    @Param('catId') catId: number,
    @Body() dto: AdoptCatDto,
  ): Promise<AdoptionView> {
    return this.adoptionManager.adoptCat(catId, dto);
  }
}
