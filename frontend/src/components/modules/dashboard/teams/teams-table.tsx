import { apiFetch } from "@/lib/api"
import { Team, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import React, { useState, useEffect } from "react"

async function getData(): Promise<Team[]> {
  const response = await apiFetch<Team[]>("/teams")
  if (!response) return []
  return response.map((team) => {
    const hasMatches = team.wins || team.losses
    
    return {
      ...team,
      games_played: team.wins + team.losses,
      win_rate: hasMatches ? team.wins / (team.wins + team.losses) : 0,
      goal_difference: team.goals_for - team.goals_against,
    }
  })
}

export function TeamsTable() {
  const [data, setData] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const response = await getData()
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}
