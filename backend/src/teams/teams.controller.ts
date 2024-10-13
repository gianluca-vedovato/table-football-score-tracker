import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './create-team.dto';
import { TeamEntity } from './team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'List of teams',
    type: [TeamEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    try {
      return this.teamsService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to get teams');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Team ID' })
  @ApiResponse({
    status: 200,
    description: 'Team details',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({
    status: 201,
    description: 'The team has been successfully created.',
    type: TeamEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() team: CreateTeamDto) {
    return this.teamsService.create(team);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a team' })
  @ApiParam({ name: 'id', type: String, description: 'Team ID' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', nullable: true },
        wins: { type: 'number', nullable: true },
        losses: { type: 'number', nullable: true },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully updated.',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.teamsService.update(id, updates);
  }
}
