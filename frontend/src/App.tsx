import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TeamsTable} from "@/components/modules/dashboard/teams/teams-table"
import { PlayersTable } from "@/components/modules/dashboard/players/players-table"

function App() {
  return (
    <div>
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
    </div>
  )
}

export default App
