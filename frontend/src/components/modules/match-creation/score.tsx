import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

export function Score({
  value,
  onChange,
}: {
  value: number;
  onChange: (score: number) => void;
}) {
  
  const handleGoalScored = () => {
    onChange(value + 1)
  }

  return (
    <div className="px-6">
      <Label htmlFor="score">
        Score
      </Label>
      <div className="flex w-full max-w-[240px] items-center space-x-2 ">
        <Input type="number" id="score" placeholder="0" value={value} onChange={e => onChange(parseInt(e.target.value))} min={0} />
        <Button onClick={handleGoalScored}><Plus className="h-4 w-4 mr-2" /> Goal scored ⚽️</Button>
      </div>
    </div>
  )
}