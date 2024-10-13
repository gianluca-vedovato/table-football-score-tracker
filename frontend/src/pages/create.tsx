import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Team, type TeamType } from "@/components/modules/match-creation/team";
import { useState } from "react";

function Create() {
  const [teams, setTeams] = useState<TeamType[]>([])

  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-4">
        <Link className={buttonVariants({ variant: "link"})} to="/">
          <ArrowLeftCircle className="mr-2 h-6 w-6" /> Back to dashboard
        </Link>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl text-center">Create a new match</h1>
        <div className="flex mt-10 items-stretch">
          <Team team={teams[0]} index={0} />
          <div className="w-[1px] bg-slate-300"></div>
          <Team team={teams[1]} index={1} />
        </div>
      </div>
    </div>
  )
}

export default Create
