import { ConfigService } from '@nestjs/config';
import { Tool } from './tool';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from '../database/entities';

export class TestingTool extends Tool {
  static getTestDbDataSource(configService: ConfigService) {
    const ds = new DataSource({
      type: configService.getOrThrow('db.e2e.type'),
      database: configService.getOrThrow('db.e2e.database'),
      synchronize: true,
      entities: [...entities],
      name: 'test-db',
    } as DataSourceOptions);

    return ds.initialize();
  }
}
