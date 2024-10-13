import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { TeamEntity } from './team.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateTeamDto } from './create-team.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'List of teams',
    type: [TeamEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    try {
      const cachedTeams = await this.cacheManager.get('teams');
      if (cachedTeams) {
        return cachedTeams;
      }

      const teams = await this.teamsService.findAll();
      await this.cacheManager.set('teams', teams);
      return teams;
    } catch {
      throw new InternalServerErrorException('Failed to get teams');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Team ID' })
  async findOne(@Param('id') id: string) {
    try {
      const cachedTeam = await this.cacheManager.get(`team-${id}`);
      if (cachedTeam) {
        return cachedTeam;
      }

      const team = await this.teamsService.findOne(id);
      await this.cacheManager.set(`team-${id}`, team);
      return team;
    } catch {
      throw new InternalServerErrorException('Failed to get team');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiBody({ type: CreateTeamDto })
  async create(@Body() team: CreateTeamDto) {
    try {
      const newTeam = await this.teamsService.create(team);
      await this.cacheManager.del('teams');
      return newTeam;
    } catch {
      throw new InternalServerErrorException('Failed to create team');
    }
  }
}
