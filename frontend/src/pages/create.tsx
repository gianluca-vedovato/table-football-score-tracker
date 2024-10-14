import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Team } from "@/components/modules/match-creation/team/index";
import { useMemo, useState } from "react";
import { MatchEntity, TeamEntity } from "@/types";
import { Score } from "@/components/modules/match-creation/score";
import { apiFetch } from "@/lib/api";
import { Separator } from "@/components/ui/separator";

function Create() {
  const [teams, setTeams] = useState<TeamEntity[]>([])
  const [score, setScore] = useState<number[]>([0, 0])
  const [isLoading, setIsLoading] = useState(false)
  const [matchCreated, setMatchCreated] = useState(false)

  const updateTeams = (team: TeamEntity, index: number) => {
    setTeams((prevTeams) => {
      const newTeams = [...prevTeams]
      newTeams[index] = team
      return newTeams
    })
  }

  const updateScore = (value: number, index: number) => {
    setScore((prevScore) => {
      const newScore = [...prevScore]
      newScore[index] = value
      return newScore
    })
  }

  const handleCreateMatch = async () => {
    setIsLoading(true)
    await apiFetch<MatchEntity>("/matches", "POST", {
      teams: teams.map((team) => team.id),
      score,
    })
    setIsLoading(false)
    setMatchCreated(true)
  }

  const status = useMemo(() => {
    if (!teams[0] || !teams[1]) {
      return "Select two teams to start the match! 🏟️"
    }
    if (score[0] === score[1]) {
      return "It's a tie! ⚖️"
    }
    const winner = score[0] > score[1] ? teams[0] : teams[1]
    return `${winner.name} is winning! 🎉`
  }, [score, teams])

  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-4">
        <Link className={buttonVariants({ variant: "link"})} to="/">
          <ArrowLeftCircle className="mr-2 h-6 w-6" /> Back to dashboard
        </Link>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl text-center">Create a new match</h1>
        <p className="text-center">Select both teams before start the match</p>
        <div className="flex mt-10 items-stretch">
          <div className="flex-1">
            <Team team={teams[0]} index={0} setTeam={updateTeams} />
            { (!matchCreated && teams.length === 2) && <Score value={score[0]} onChange={(score) => updateScore(score, 0)}/> }
          </div>
          <div className="w-[1px] bg-slate-300"></div>
          <div className="flex-1">
            <Team team={teams[1]} index={1} setTeam={updateTeams} />
            { (!matchCreated && teams.length === 2) && <Score value={score[1]} onChange={(score) => updateScore(score, 1)}/> }
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Separator className="my-4" />
        <p className="text-xl text-center">
          {status}
        </p>
        <Separator className="my-4" />
      </div>
      <div className="mt-10 flex justify-center">
        {
          !matchCreated 
            ? (<Button disabled={!teams[0] || !teams[1] || (score[0] === score[1] || isLoading)} onClick={handleCreateMatch}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create match
              </Button>)
            : (
              <div className="text-center">
                <p className="text-xl">Match created! 🎉</p>
                <p className="text-gray-400 mt-0.5">You can now go back to the dashboard</p>
                <div className="mt-2">
                  <Link to="/" className={buttonVariants({ variant: "default" })}>
                    Go to dashboard
                  </Link>
                </div>
              </div>
            )
        }
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col items-center gap-4">
        <p>Want to see the match history between the 2 teams?</p>
        <Link to={`/h2h?team1=${teams[0].id}&team2=${teams[1].id}`} className={buttonVariants({ variant: "outline" })}>
          Go to head to head
        </Link>
      </div>
    </div>
  )
}

export default Create
