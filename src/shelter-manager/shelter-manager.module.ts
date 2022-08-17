import { Module } from '@nestjs/common';
import { ShelterManager } from './shelter-manager';

@Module({
  providers: [ShelterManager],
  exports: [ShelterManager],
})
export class ShelterManagerModule {}
