import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({
    status: 200,
    description: 'List of players',
    type: [PlayerEntity],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    try {
      return this.playerService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to get players');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Player ID' })
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiBody({ schema: { properties: { name: { type: 'string' } } } })
  create(@Body() player: { name: string }) {
    return this.playerService.create(player);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a player' })
  @ApiParam({ name: 'id', type: String, description: 'Player ID' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', nullable: true },
        wins: { type: 'number', nullable: true },
        losses: { type: 'number', nullable: true },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body()
    updates: Partial<{ name: string; wins: number; losses: number }>,
  ) {
    return this.playerService.update(id, updates);
  }
}
