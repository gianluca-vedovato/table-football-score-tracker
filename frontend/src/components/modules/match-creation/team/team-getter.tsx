import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button";
import { apiFetch } from '@/lib/api';

import { Edit2 } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { TeamEntity } from "@/types";
import { Loading } from "./views/loading";
import { SelectTeam } from "./views/select";
import { AddNewTeam } from "./views/add-new";

export function TeamGetter({
  team,
  setTeam,
  hasTeam
}: {
  team?: TeamEntity;
  setTeam: (team: TeamEntity) => void;
  hasTeam: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [teams, setTeams] = useState<TeamEntity[]>([])
  const [selectedTeam, setSelectedTeam] = useState<TeamEntity | undefined>(team)
  const [isLoadingTeams, setIsLoadingTeams] = useState(true)
  const [showAddNewView, setShowAddNewView] = useState(false)

  const fetchTeams = async () => {
    setIsLoadingTeams(true)
    const teams = await apiFetch<TeamEntity[]>("/teams")
    setTeams(teams)
    setIsLoadingTeams(false)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const handleNewTeam = (team: TeamEntity) => {
    setSelectedTeam(team)
    setTeam(team)
    setShowAddNewView(false)
    fetchTeams()
    setIsOpen(false)
  }

  const handleSave = () => {
    if (selectedTeam) {
      setTeam(selectedTeam)
      setIsOpen(false)
    }
  }

  const contentView = useMemo(() => {
    if (isLoadingTeams) {
      return <Loading />
    }
    if (showAddNewView) {
      return (
        <AddNewTeam
          onAdd={handleNewTeam}
          onViewChange={() => setShowAddNewView(false)}
        />
      )
    }
    return (
      <SelectTeam
        teams={teams}
        value={selectedTeam}
        onChange={setSelectedTeam}
        onViewChange={() => setShowAddNewView(true)}
        onSave={handleSave}
      />
    )
  }, [isLoadingTeams, selectedTeam, showAddNewView, teams])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setShowAddNewView(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <div className="text-gray-400 ml-2 text-s">
          {
            hasTeam
              ? <Edit2 className="w-4" />
              : "Select a team"
          }
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="sm:w-[640px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>
            Select a team
          </SheetTitle>
          <SheetDescription>
            Select a team from the list below or add a new one.
          </SheetDescription>
        </SheetHeader>
        { contentView }
      </SheetContent>
    </Sheet>
  );
}