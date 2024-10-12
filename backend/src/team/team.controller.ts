import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  create(@Body() team: CreateTeamDto) {
    return this.teamService.create(team);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.teamService.update(id, updates);
  }
}
