import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";

export type TeamType = {
  id: string;
  name: string;
};

export function Team ({
  team,
  index
}: {
  team?: TeamType;
  index: number;
}) {

  const teamHeader = useMemo(() => {
    if (!team) {
      return (<div className="flex gap-1 items-baseline">
        <h2 className="text-xl">
          Team {index + 1}
        </h2>
        <Button variant="link" className="text-center text-gray-400">
          Select team
        </Button>
      </div>);
    }
    return (
      <h2 className="text-xl">
        {team.name}
      </h2>
    );
  }, [team, index]);

  return (
    <div className="flex-1 px-6 py-5">
      { teamHeader }
    </div>
  );
}