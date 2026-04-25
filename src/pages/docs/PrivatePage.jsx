import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const PrivatePage = () => {
  const { isUnlocked, lock } = useAuth();
  const location = useLocation();

  if (!isUnlocked) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
        <div>
        <h2> Secret Builds</h2>
        <button onClick={lock}>
            Lock
        </button>
        </div>

        <div>
        <p>
             Internal dev notes. These are pre-release builds not in the live game.
        </p>
        </div>

        <p>
        The upcoming Spellblade class combines Mage and Warrior mechanics into a melee-range spellcaster. 
        Core mechanic: each melee hit charges a spell, releasing it on a separate keybind. 
        Expected in patch 2.4. The Necromancer subclass for Mage is also in testing — 
        summons skeletal minions that scale with Intelligence. 
        Raid testing phase begins next month internally.
        </p>
    </div>
    )
}
