import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { SupabaseModule } from '../shared/supabase/supabase.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [SupabaseModule, CacheModule.register({ ttl: 5000 })],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
