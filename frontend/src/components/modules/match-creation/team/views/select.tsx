import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TeamEntity } from "@/types";

export function SelectTeam({
  teams,
  value,
  onChange,
  onViewChange,
  onSave
}: {
  teams: TeamEntity[];
  value?: TeamEntity;
  onChange: (team: TeamEntity) => void;
  onViewChange: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex flex-col justify-center mt-5">
      <Select onValueChange={(value: string) => onChange(teams.find((t) => t.id === value)!)} defaultValue={value?.id}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          {
            teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <Button type="submit" disabled={!value} onClick={onSave} className="mt-4">Select team</Button>
      <div>
        <p className="text-center mt-0.5 text-gray-400">
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