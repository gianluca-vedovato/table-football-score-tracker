import { ApiProperty } from '@nestjs/swagger';

export class TeamEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  goals_for: number;

  @ApiProperty()
  goals_against: number;
}
