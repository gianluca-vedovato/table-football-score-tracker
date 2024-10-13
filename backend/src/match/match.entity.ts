import { ApiProperty } from '@nestjs/swagger';

export class MatchEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  score: [number, number];

  @ApiProperty()
  players?: [string, string];

  @ApiProperty()
  teams?: [string, string];
}
