import { ShelterExplorer } from './shelter-explorer';
import { Module } from '@nestjs/common';

@Module({
  providers: [ShelterExplorer],
  exports: [ShelterExplorer],
})
export class ShelterExplorerModule {}
