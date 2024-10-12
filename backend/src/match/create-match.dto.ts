type MatchType = 'teams' | 'players';

export class CreateMatchDto {
  score: [number, number];
  type: MatchType;
  players: MatchType extends 'players' ? string[] : never;
  teams: MatchType extends 'teams' ? string[] : never;
}
