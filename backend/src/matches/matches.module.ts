import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { SupabaseModule } from '../shared/supabase/supabase.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [SupabaseModule, CacheModule.register({ ttl: 5000 })],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
