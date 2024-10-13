import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { PlayerEntity } from "@/types"
import { useState } from "react"
import { apiFetch } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function AddNewPlayer ({
  onAdd,
  onViewChange
}: {
  onAdd: (team: PlayerEntity) => void,
  onViewChange: () => void
}) {
  const [newPlayerName, setNewPlayerName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCreatePlayer = async () => {
    setIsLoading(true)
    const response = await apiFetch<PlayerEntity>("/players", 'POST', { name: newPlayerName })

    if (!response) {
      toast({
        title: "Error creating player",
        description: "Please try again",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Player created",
      description: "You can now select it for your team",
    })
    onAdd(response)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="flex w-full items-center space-x-2">
        <Input type="text" placeholder="Name" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} />
        <Button type="submit" disabled={!newPlayerName || isLoading} onClick={handleCreatePlayer}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add new
        </Button>
      </div>
      </div>
      <div>
        <p className="mt-0.5 text-gray-400">
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