import { Injectable, Inject } from '@nestjs/common';
import { SupabaseService } from '../shared/supabase/supabase.service';
import { CreateMatchDto } from './create-match.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MatchesService {
  private readonly table = 'matches';

  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  findAll() {
    return this.supabaseService.findAll(this.table);
  }

  findOne(id: string) {
    return this.supabaseService.findOne(this.table, id);
  }

  async create(match: CreateMatchDto) {
    // Create a new match
    const newMatch = await this.supabaseService.create(this.table, {
      score: match.score,
    });
    const newMatchId = newMatch.id;

    // Update the join table with the teams in the match
    await Promise.all(
      match.teams.map((team, index) =>
        this.supabaseService.create('match_teams', {
          match_id: newMatchId,
          team_id: team,
          score_index: index,
        }),
      ),
    );

    // Update the teams' wins, losses and goals
    await Promise.all(
      match.teams.map(async (team, index) => {
        await this.supabaseService.callFunction('update_team_stats', {
          rowid: team,
          new_wins: match.score[index] > match.score[1 - index] ? 1 : 0,
          new_losses: match.score[index] < match.score[1 - index] ? 1 : 0,
          new_goals_for: match.score[index],
          new_goals_against: match.score[1 - index],
        });

        // Invalidate player cache
        await this.cacheManager.del(`team-${team}`);
      }),
    );

    // Update the players' wins, losses and goals
    await Promise.all(
      match.teams.map(async (team, index) => {
        const players = await this.supabaseService.findAll('team_players', {
          team_id: team,
        });

        return Promise.all(
          players.map(async (player) => {
            await this.supabaseService.callFunction('update_player_stats', {
              rowid: player.player_id,
              new_wins: match.score[index] > match.score[1 - index] ? 1 : 0,
              new_losses: match.score[index] < match.score[1 - index] ? 1 : 0,
              new_goals_for: match.score[index],
              new_goals_against: match.score[1 - index],
            });

            // Invalidate player cache
            await this.cacheManager.del(`player-${player.player_id}`);
          }),
        );
      }),
    );

    return newMatch;
  }

  update(
    id: string,
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.supabaseService.update(this.table, id, updates);
  }
}
