import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TeamsTable} from "@/components/modules/dashboard/teams/teams-table"
import { PlayersTable } from "@/components/modules/dashboard/players/players-table"
import { Intro } from "@/components/modules/intro"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

function Dashboard() {
  return (
    <div>
      <Intro />
      <div className="w-full px-6 py-6 flex justify-center">
        <Tabs defaultValue="teams" className="w-full flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>
          <TabsContent value="teams">
            <TeamsTable />
          </TabsContent>
          <TabsContent value="players">
            <PlayersTable />
          </TabsContent>
        </Tabs>
      </div>
      <div className="container mx-auto">
        <Separator className="my-2" />
        <div className="my-10 flex flex-col items-center">
          <p>
            Want to see the history of all the teams?
          </p>
          <div className="mt-4">
            <Link to="/h2h" className={buttonVariants({ variant: "default" })}>
              Go to teams history
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
