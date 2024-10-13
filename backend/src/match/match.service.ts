import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../shared/supabase/supabase.service';
import { CreateMatchDto } from './create-match.dto';

@Injectable()
export class MatchService {
  private readonly table = 'matches';

  constructor(private readonly supabaseService: SupabaseService) {}

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
    const newMatchId = newMatch[0].id;

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
      match.teams.map(async (team, index) =>
        this.supabaseService.callFunction('update_team_stats', {
          rowid: team,
          new_wins: match.score[index] > match.score[1 - index] ? 1 : 0,
          new_losses: match.score[index] < match.score[1 - index] ? 1 : 0,
          new_goals_for: match.score[index],
          new_goals_against: match.score[1 - index],
        }),
      ),
    );

    // Update the players' wins, losses and goals
    await Promise.all(
      match.teams.map(async (team, index) => {
        const players = await this.supabaseService.findAll('team_players', {
          team_id: team,
        });

        return Promise.all(
          players.map((player) =>
            this.supabaseService.callFunction('update_player_stats', {
              rowid: player.player_id,
              new_wins: match.score[index] > match.score[1 - index] ? 1 : 0,
              new_losses: match.score[index] < match.score[1 - index] ? 1 : 0,
              new_goals_for: match.score[index],
              new_goals_against: match.score[1 - index],
            }),
          ),
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
