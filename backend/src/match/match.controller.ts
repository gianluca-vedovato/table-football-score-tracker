import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(id);
  }

  @Post()
  create(@Body() match: CreateMatchDto) {
    return this.matchService.create(match);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.matchService.update(id, updates);
  }
}
