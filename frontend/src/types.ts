export type TeamEntity = {
  id: string;
  name: string;
};

export type PlayerEntity = {
  id: string;
  name: string;
};

export type MatchEntity = {
  id: string;
  score: [number, number];
  teams: [string, string];
};

export type MatchHistoryEntity = {
  id: string;
  matchId: string;
  team1: TeamEntity;
  team2: TeamEntity;
  score: [number, number];
  date: Date;
};