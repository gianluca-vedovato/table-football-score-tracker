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