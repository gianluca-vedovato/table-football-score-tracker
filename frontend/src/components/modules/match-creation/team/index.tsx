import { TeamGetter } from "./team-getter";
import { TeamEntity } from "@/types";

export function Team ({
  team,
  index,
  setTeam
}: {
  team?: TeamEntity;
  index: number;
  setTeam: (team: TeamEntity, index: number) => void;
}) {

  return (
    <div className="flex-1 px-6 py-5">
      <div className="flex gap-1 items-center">
        <h2 className="text-xl">
          {
            team ? team.name : `Team ${index + 1}`
          }
        </h2>
        <TeamGetter
          team={team}
          hasTeam={!!team}
          setTeam={
            (newTeam) => {
              setTeam(newTeam, index);
            }
          } 
        />
      </div>
    </div>
  );
}