import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [PlayersModule, TeamsModule, MatchesModule, CacheModule.register()],
})
export class AppModule {}
