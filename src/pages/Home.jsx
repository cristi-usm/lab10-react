import { Link } from "react-router";

export const Home = () =>{
    return (
    <div>
      <div>
        <div>
          <div>⚔️</div>
          <h1>Aethermoor Chronicles</h1>
          <p>
            The complete player guide for the world of Aethermoor. Classes, mechanics, combat, and more.
          </p>
          <div>
            <Link to="/docs">
              Start Reading →
            </Link>
            <Link to="/search">
              Search Docs
            </Link>
          </div>
        </div>

        <div>
          <div>
            <Link to="/docs/basics">
              <div>
                <div>📖</div>
                <h5>Basics</h5>
                <p>
                  Getting started, character creation, controls, and leveling
                </p>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/docs/classes">
              <div>
                <div>⚔️</div>
                <h5>Classes</h5>
                <p>
                  Warrior, Mage, Rogue, Cleric, and Ranger — full breakdowns
                </p>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/docs/mechanics">
              <div>
                <div>⚙️</div>
                <h5>Mechanics</h5>
                <p>
                  Combat, crafting, PvP, dungeons, and economy explained
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}