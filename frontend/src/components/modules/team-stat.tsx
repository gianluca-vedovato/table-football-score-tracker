import cn from 'classnames'

export function TeamStat ({
  name,
  wins,
  side
}: {
  name: string;
  wins: number;
  side: 'left' | 'right';
}) {
  return (
    <div className={cn(["flex gap-4 items-center", side === "left" ? "text-right flex-row" : "text-left flex-row-reverse"])}>
      <h3 className="text-2xl w-60">
        {name}
      </h3>
      <div className={cn(["text-white rounded-full h-20 w-20 flex flex-col items-center justify-center", side === "left" ? "bg-blue-500" : "bg-red-500"])}>
        <p className="text-center">Wins</p>
        <p className="text-center text-xl font-bold">{wins}</p>
      </div>
    </div>
  )
}