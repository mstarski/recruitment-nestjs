import { Module } from '@nestjs/common';
import { AdoptionManager } from './adoption-manager';

@Module({
  providers: [AdoptionManager],
  exports: [AdoptionManager],
})
export class AdoptionManagerModule {}
