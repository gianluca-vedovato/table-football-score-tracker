"use client"

import { ColumnDef, HeaderContext } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Team = {
  id: string
  name: string
  games_played: number
  wins: number
  losses: number
  win_rate: number
  goals_for: number
  goals_against: number
  goal_difference: number
}

const SortableHeader = ({ title, column }: Partial<HeaderContext<Team, unknown>> & { title: string }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column!.toggleSorting(column!.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader title="Name" column={column} />,
  },
  {
    accessorKey: "games_played",
    header: ({ column }) => <SortableHeader title="Games Played" column={column} />,
  },
  {
    accessorKey: "wins",
    header: ({ column }) => <SortableHeader title="Wins" column={column} />,
  },
  {
    accessorKey: "losses",
    header: ({ column }) => <SortableHeader title="Losses" column={column} />,
  },
  {
    accessorKey: "win_rate",
    header: ({ column }) => <SortableHeader title="Win Rate" column={column} />,
  },
  {
    accessorKey: "goals_for",
    header: ({ column }) => <SortableHeader title="Goals For" column={column} />,
  },
];
