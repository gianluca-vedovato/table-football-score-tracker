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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './create-match.dto';
import { MatchEntity } from './match.entity';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({
    status: 200,
    description: 'List of matches',
    type: [MatchEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    try {
      return this.matchesService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to get matches');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Match ID' })
  @ApiResponse({
    status: 200,
    description: 'Match details',
    type: MatchEntity,
  })
  @ApiResponse({ status: 404, description: 'Match not found' })
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  @ApiBody({ type: CreateMatchDto })
  @ApiResponse({
    status: 201,
    description: 'The match has been successfully created.',
    type: MatchEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() match: CreateMatchDto) {
    return this.matchesService.create(match);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a match' })
  @ApiParam({ name: 'id', type: String, description: 'Match ID' })
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
    description: 'The match has been successfully updated.',
    type: MatchEntity,
  })
  @ApiResponse({ status: 404, description: 'Match not found' })
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.matchesService.update(id, updates);
  }
}
