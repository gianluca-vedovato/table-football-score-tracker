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

    // Get the type of the match (players or teams) and set some variables accordingly
    const matchType = match.type;
    const contendents = match[matchType] as [string, string];
    const matchJoinTable =
      matchType === 'players' ? 'match_players' : 'match_teams';
    const contendentKey = matchType === 'players' ? 'player_id' : 'team_id';
    const contendentUpdateFunction =
      matchType === 'players' ? 'update_player_stats' : 'update_team_stats';

    // Update the join table with the players/teams in the match
    await Promise.all(
      contendents.map((player, index) =>
        this.supabaseService.create(matchJoinTable, {
          match_id: newMatchId,
          [contendentKey]: player,
          score_index: index,
        }),
      ),
    );

    // Update the players'/teams' wins, losses and goals
    await Promise.all(
      contendents.map(async (contendent, index) =>
        this.supabaseService.callFunction(contendentUpdateFunction, {
          rowid: contendent,
          new_wins: match.score[index] > match.score[1 - index] ? 1 : 0,
          new_losses: match.score[index] < match.score[1 - index] ? 1 : 0,
          new_goals_for: match.score[index],
          new_goals_against: match.score[1 - index],
        }),
      ),
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
