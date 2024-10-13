import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { SupabaseModule } from '../shared/supabase/supabase.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [SupabaseModule, CacheModule.register({ ttl: 5000 })],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
