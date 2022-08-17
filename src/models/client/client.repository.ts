import { AppRepository } from '../../infra/app-repository';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../database/entities/client.entity';
import { Client } from './client.model';

export class ClientRepository extends AppRepository<ClientEntity, Client> {
  constructor(protected readonly dbRepo: Repository<ClientEntity>) {
    super(dbRepo);
  }
}
