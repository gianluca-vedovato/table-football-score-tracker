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
import { MatchesService } from './matches.service';
import { MatchEntity } from './match.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateMatchDto } from './create-match.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({
    status: 200,
    description: 'List of matches',
    type: [MatchEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    try {
      const cachedMatches = await this.cacheManager.get('matches');
      if (cachedMatches) {
        return cachedMatches;
      }

      const matches = await this.matchesService.findAll();
      await this.cacheManager.set('matches', matches);
      return matches;
    } catch {
      throw new InternalServerErrorException('Failed to get matches');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Match ID' })
  async findOne(@Param('id') id: string) {
    try {
      const cachedMatch = await this.cacheManager.get(`match-${id}`);
      if (cachedMatch) {
        return cachedMatch;
      }

      const match = await this.matchesService.findOne(id);
      await this.cacheManager.set(`match-${id}`, match);
      return match;
    } catch {
      throw new InternalServerErrorException('Failed to get match');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  @ApiBody({ type: CreateMatchDto })
  async create(@Body() match: CreateMatchDto) {
    try {
      const newMatch = await this.matchesService.create(match);
      await this.cacheManager.del('matches');
      return newMatch;
    } catch {
      throw new InternalServerErrorException('Failed to create match');
    }
  }
}
