import { apiFetch } from '@/lib/api';

import { useEffect, useMemo, useState } from "react";
import { PlayerEntity } from "@/types";
import { Loading } from "./views/loading";
import { SelectPlayer } from "./views/select";
import { AddNewPlayer } from "./views/add-new";

export function PlayerGetter({
  player,
  setPlayer
}: {
  player?: PlayerEntity;
  setPlayer: (player: PlayerEntity) => void;
}) {
  const [players, setPlayers] = useState<PlayerEntity[]>([])
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [showAddNewView, setShowAddNewView] = useState(false)

  const fetchPlayers = async () => {
    setIsLoadingPlayers(true)
    const players = await apiFetch<PlayerEntity[]>("/players")
    setPlayers(players)
    setIsLoadingPlayers(false)
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleAddNewPlayer = (player: PlayerEntity) => {
    setPlayer(player)
    setShowAddNewView(false)
    fetchPlayers()
  }

  const contentView = useMemo(() => {
    if (isLoadingPlayers) {
      return <Loading />
    }
    if (showAddNewView) {
      return (
        <AddNewPlayer
          onAdd={handleAddNewPlayer}
          onViewChange={() => setShowAddNewView(false)}
        />
      )
    }
    return (
      <SelectPlayer
        players={players}
        value={player}
        onChange={setPlayer}
        onViewChange={() => setShowAddNewView(true)}
      />
    )
  }, [isLoadingPlayers, player, showAddNewView, players])

  return (
    <div>
      {contentView}
    </div>
  );
}