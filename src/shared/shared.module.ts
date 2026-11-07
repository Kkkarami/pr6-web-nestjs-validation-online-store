import { Module } from '@nestjs/common';
import { SlugService } from './slug/slug.service';
import { appConfigProvider, STORE_CONFIG } from './config/app-config.provider';
import { feeCalculatorProvider, FEE_CALCULATOR } from './config/fee-calculator.provider';

@Module({
  providers: [SlugService, appConfigProvider, feeCalculatorProvider],
  exports: [SlugService, STORE_CONFIG, FEE_CALCULATOR],
})
export class SharedModule {}