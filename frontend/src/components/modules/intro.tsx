import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CirclePlus } from "lucide-react"

export function Intro () {
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-center mb-2" role="presentation">
        <span className="text-6xl">⚽️</span>
      </div>
      <h1 className="text-4xl text-center">Table football score tracker</h1>
      <p className="text-center mt-4">
        Welcome to the table football score tracker. Here you can see the current standings for teams and players. <br />For create a new match, click on the "New Match" button.
      </p>
      <div className="mt-4 flex justify-center">
        <Link className={buttonVariants({ variant: "default"})} to="/create">
          <CirclePlus className="mr-2 h-4 w-4" /> Create new match
        </Link>
      </div>
    </div>
  )
}