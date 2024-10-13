import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayerEntity, TeamEntity } from "@/types"
import { useEffect, useState } from "react"
import { PlayerGetter } from "@/components/modules/match-creation/player/player-getter"
import { Separator } from "@/components/ui/separator"
import { apiFetch } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddNewTeam ({
  onAdd,
  onViewChange
}: {
  onAdd: (team: PlayerEntity) => void,
  onViewChange: () => void
}) {
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamPlayers, setNewTeamPlayers] = useState<PlayerEntity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSetPlayer = (player: PlayerEntity, index: number) => {
    setNewTeamPlayers((prev) => {
      const newPlayers = [...prev]
      newPlayers[index] = player
      return newPlayers
    })
  }

  const handleCreateTeam = async () => {
    setIsLoading(true)
    const response = await apiFetch<TeamEntity>(
      "/teams",
      "POST",
      {
        name: newTeamName,
        players: newTeamPlayers
          .filter((player) => player)
          .map((player) => player.id)
      }
    )

    if (!response) {
      toast({
        title: "Error creating team",
        description: "Please try again",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Team created",
      description: "You can now select it for your match",
    })
    onAdd(response)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(newTeamPlayers)
  }, [newTeamPlayers])
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="email">Team name</Label>
          <Input type="name" id="name" placeholder="Team name" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
        </div>
        <Separator className="my-4" />
        <div className="grid w-full items-center gap-1.5 mt-5">
          <h3 className="text-lg">Player 1</h3>
          <PlayerGetter player={newTeamPlayers[0]} setPlayer={(player: PlayerEntity) => handleSetPlayer(player, 0)} />
        </div>
        <Separator className="my-4" />
        <div className="grid w-full items-center gap-1.5 mt-5">
          <h3 className="text-lg">Player 2</h3>
          <PlayerGetter player={newTeamPlayers[1]} setPlayer={(player: PlayerEntity) => handleSetPlayer(player, 1)} />
        </div>
        <Separator className="my-4" />
      </div>
      <Button onClick={handleCreateTeam} disabled={!newTeamName || !newTeamPlayers?.length || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create new team
      </Button>
      <div>
        <p className="text-center mt-0.5 text-gray-400">
          or 
          <Button
            variant="link"
            onClick={onViewChange}
            className="text-gray-400 px-1"
          >
            Select an existing one
          </Button>
        </p>
      </div>
    </div>
  )
}