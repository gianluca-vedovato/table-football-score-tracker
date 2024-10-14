import { MatchHistoryEntity, TeamEntity } from "@/types";
import { useEffect, useState } from "react";
import { TeamStat } from "./team-stat";
import { Separator } from "@/components/ui/separator";

export function TeamsH2H ({
  matches,
  teams
}: {
  matches: MatchHistoryEntity[]
  teams: [TeamEntity, TeamEntity]
}) {
  const [teamsWins, setTeamsWins] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const team1 = { wins: 0 }
    const team2 = { wins: 0 }

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]
      const winner = match.score[0] > match.score[1] ? match.team1 : match.team2
      const teamWinner = teams[0].id === winner.id ? team1 : team2
      teamWinner.wins++
    }

    setTeamsWins([team1.wins, team2.wins])
  }, [matches])

  return (
    <div>
      <div className="flex justify-center gap-8 items-center">
        <TeamStat name={teams[0].name} wins={teamsWins[0]} side="left" />
        -
        <TeamStat name={teams[1].name} wins={teamsWins[1]} side="right" />
      </div>
      <div className="my-10 flx-justify-center">
        <div className="h-2 rounded-full overflow-hidden w-full relative">
          <div 
            className="h-full bg-blue-400 absolute left-0 top-0" 
            style={{ width: `${(teamsWins[0] / (teamsWins[0] + teamsWins[1]) * 100)}%` }}
          ></div>
          <div 
            className="h-full bg-red-400 absolute right-0 top-0" 
            style={{ width: `${(teamsWins[1] / (teamsWins[0] + teamsWins[1]) * 100)}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mt-4">
          {
            matches.map((match) => (
              <div key={match.id} className="relative">
                <div className="absolute top-0 left-0 text-gray-400 text-xs pt-4">
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(match.date))}
                </div>
                <div className="flex justify-center gap-4 py-6">
                  <span className="text-xl w-60 text-right">
                    {match.team1.name}
                  </span>
                  <span className="text-2xl w-20 text-center">
                    {match.score[0]} - {match.score[1]}
                  </span>
                  <span className="text-xl w-60 text-left">
                    {match.team2.name}
                  </span>
                </div>
                <Separator />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}