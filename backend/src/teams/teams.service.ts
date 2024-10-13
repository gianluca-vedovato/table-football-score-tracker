import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../shared/supabase/supabase.service';
import { CreateTeamDto } from './create-team.dto';

@Injectable()
export class TeamsService {
  private readonly table = 'teams';

  constructor(private readonly supabaseService: SupabaseService) {}

  findAll() {
    return this.supabaseService.findAll(this.table);
  }

  findOne(id: string) {
    return this.supabaseService.findOne(this.table, id);
  }

  async create(team: CreateTeamDto) {
    const newTeam = await this.supabaseService.create(this.table, {
      name: team.name,
    });
    const newTeamId = newTeam.id;
    await Promise.all(
      team.players.map((player) =>
        this.supabaseService.create('team_players', {
          team_id: newTeamId,
          player_id: player,
        }),
      ),
    );
    return newTeam;
  }

  update(
    id: string,
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.supabaseService.update(this.table, id, updates);
  }
}
