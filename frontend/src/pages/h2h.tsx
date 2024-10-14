import { SelectTeam } from "@/components/modules/match-creation/team/views/select";
import { TeamsH2H } from "@/components/modules/teams-h2h";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { MatchHistoryEntity, TeamEntity } from "@/types";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function H2H () {
  // ------ States and variables ------
  const [teams, setTeams] = useState<(TeamEntity)[]>([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTeams, setSelectedTeams] = useState<(TeamEntity | undefined)[]>([]);
  const [matches, setMatches] = useState<MatchHistoryEntity[]>([]);
  const lookForSearchParams = useRef(false)

  const [pageLoaded, setPageLoaded] = useState(false);

  // ------ Utils ------

  // Fetch all teams
  const fetchTeams = async () => {
    const response = await apiFetch<TeamEntity[]>("/teams");
    setTeams(response);
  }

  // Util to get the matches between the selected teams
  const getMatches = async () => {
    if (!selectedTeams[0] || !selectedTeams[1]) {
      return;
    }

    const response = await apiFetch<MatchHistoryEntity[]>(`/matches/h2h/${selectedTeams[0].id}/${selectedTeams[1].id}`);
    setMatches(response);
  }

  const onChange = (team: TeamEntity, index: number) => {
    const newParam = new URLSearchParams(searchParams);
    newParam.set(`team${index + 1}`, team.id);
    setSearchParams(newParam);
  }

  // ------ Effects ------
  useEffect(() => {
    fetchTeams();
  }, []);

  // Set state based on URL params
  useEffect(() => {
    const team1 = searchParams.get("team1");
    const team2 = searchParams.get("team2");

    if (!team1 && !team2) {
      setPageLoaded(true)
      return
    }
    const team1Obj = teams.find((t) => t.id === team1);
    const team2Obj = teams.find((t) => t.id === team2);

    setSelectedTeams([team1Obj, team2Obj]);
    // Temp variable to check if we should load the page
    lookForSearchParams.current = true
  }, [searchParams, teams]);

  // Check if we should load the page based on the URL params
  useEffect(() => {
    if (pageLoaded) return
    if (!lookForSearchParams.current) return
    if (!selectedTeams[0] && !selectedTeams[1]) return
    setPageLoaded(true)
  }, [lookForSearchParams.current, selectedTeams])

  // Fetch matches when both teams are selected
  useEffect(() => {
    if (!selectedTeams[0] || !selectedTeams[1]) return
    getMatches();
  }, [selectedTeams]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-4">
        <Link className={buttonVariants({ variant: "link"})} to="/">
          <ArrowLeftCircle className="mr-2 h-6 w-6" /> Back to dashboard
        </Link>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl text-center">Head to Head</h1>
      </div>

      {
        !pageLoaded ? (
          <div className="flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className="mt-5">Team 1: </span>
                <SelectTeam teams={teams} value={selectedTeams[0]} onChange={(team) => onChange(team, 0)} canAddNew={false} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className="mt-5">Team 2: </span>
                <SelectTeam teams={teams} value={selectedTeams[1]} onChange={(team) => onChange(team, 1)} canAddNew={false} />
              </div>
            </div>
            {
              matches && <TeamsH2H matches={matches} teams={selectedTeams as [TeamEntity, TeamEntity]} />
            }
          </>
        )
      }
    </div>
  )
}