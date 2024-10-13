import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
@Module({
  imports: [PlayersModule, TeamsModule, MatchesModule],
})
export class AppModule {}
