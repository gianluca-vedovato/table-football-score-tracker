import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Post()
  create(@Body() player: { name: string }) {
    return this.playerService.create(player);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.playerService.update(id, updates);
  }
}
