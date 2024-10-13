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
import { PlayersService } from './players.service';
import { PlayerEntity } from './player.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({
    status: 200,
    description: 'List of players',
    type: [PlayerEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    try {
      const cachedPlayers = await this.cacheManager.get('players');
      if (cachedPlayers) {
        return cachedPlayers;
      }

      const players = await this.playersService.findAll();
      await this.cacheManager.set('players', players);
      return players;
    } catch {
      throw new InternalServerErrorException('Failed to get players');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Player ID' })
  async findOne(@Param('id') id: string) {
    try {
      const cachedPlayer = await this.cacheManager.get(`player-${id}`);
      if (cachedPlayer) {
        return cachedPlayer;
      }

      const player = await this.playersService.findOne(id);
      await this.cacheManager.set(`player-${id}`, player);
      return player;
    } catch {
      throw new InternalServerErrorException('Failed to get player');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiBody({ type: PlayerEntity })
  async create(@Body() player: PlayerEntity) {
    try {
      const newPlayer = await this.playersService.create(player);
      await this.cacheManager.del('players');
      return newPlayer;
    } catch {
      throw new InternalServerErrorException('Failed to create player');
    }
  }
}
