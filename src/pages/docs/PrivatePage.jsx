import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const PrivatePage = () => {
  const { isUnlocked, lock } = useAuth()
  const location = useLocation()

  if (!isUnlocked) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!isUnlocked) {
  return <Navigate to="/login" replace state={{ from: location }} />
}

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">🔓 Secret Builds</h4>
        <button onClick={lock} className="btn btn-sm btn-outline-secondary">Lock</button>
      </div>
      <div className="alert alert-warning" style={{ fontSize: "0.85rem" }}>
        Internal dev notes — pre-release content not in the live game.
      </div>
      <p>The upcoming Spellblade class combines Mage and Warrior into a melee spellcaster. Each melee hit charges a spell released on a separate keybind. Expected in patch 2.4.</p>
    </div>
  )
}
