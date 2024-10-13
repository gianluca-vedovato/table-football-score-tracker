import { Injectable } from '@nestjs/common';
import { createSupabaseClient } from 'src/utils/supabaseClient';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createSupabaseClient();
  }

  async findAll(table: string, filters?: { [key: string]: any }) {
    let query = this.supabase.from(table).select('*');

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
      }
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(table: string, id: string) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async create(table: string, record: any) {
    const { data, error } = await this.supabase
      .from(table)
      .insert([record])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  async update(table: string, id: string, updates: { [key: string]: any }) {
    const { data, error } = await this.supabase
      .from(table)
      .update(updates)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }

  async callFunction(functionName: string, params: any) {
    const { data, error } = await this.supabase.rpc(functionName, params);
    if (error) throw new Error(error.message);
    return data;
  }
}
