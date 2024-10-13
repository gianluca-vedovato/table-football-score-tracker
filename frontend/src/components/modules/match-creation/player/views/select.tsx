import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlayerEntity } from "@/types";

export function SelectPlayer({
  players,
  value,
  onChange,
  onViewChange,
}: {
  players: PlayerEntity[];
  value?: PlayerEntity;
  onChange: (player: PlayerEntity) => void;
  onViewChange: () => void;
}) {

  return (
    <div className="flex flex-col justify-center mt-0.5">
      <Select onValueChange={(value: string) => onChange(players.find((t) => t.id === value)!)} defaultValue={value?.id}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent>
          {
            players.map((player) => (
              <SelectItem key={player.id} value={player.id}>
                {player.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <div>
        <p className="mt-0.5 text-gray-400">
          or 
          <Button
            variant="link"
            onClick={onViewChange}
            className="text-gray-400 px-1"
          >
            Add a new one
          </Button>
        </p>
        
      </div>
    </div>
  )
}