import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../shared/supabase/supabase.service';

@Injectable()
export class PlayerService {
  private readonly table = 'players';

  constructor(private readonly supabaseService: SupabaseService) {}

  findAll() {
    return this.supabaseService.findAll(this.table);
  }

  findOne(id: string) {
    return this.supabaseService.findOne(this.table, id);
  }

  create(player: { name: string }) {
    return this.supabaseService.create(this.table, player);
  }

  update(
    id: string,
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.supabaseService.update(this.table, id, updates);
  }
}
