import { Link } from "react-router";
import { GiDervishSwords } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { FaBookSkull } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { useState } from "react";



export const Home = () =>{
const [input, setInput] = useState("")

    return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2"><GiDervishSwords /> Aethermoor Chronicles</h1>
      <p className="text-muted mb-4">The complete player guide for classes, mechanics, and combat.</p>
      <div className="d-flex gap-2 mb-5">
        <Link to="/docs" className="btn btn-primary">Start Reading</Link>
        <input
          type="text"
          className="form-control-sm"
          placeholder="Search docs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Link to={`/search?q=${input}`} className="btn btn-outline-secondary">Search</Link>
      </div>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title"><FaBookSkull /> Basics</h5>
              <p className="card-text text-muted" style={{ fontSize: "0.88rem" }}>Getting started, character creation, controls, leveling.</p>
              <Link to="/docs/basics" className="btn btn-sm btn-outline-primary">Browse</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title"><LuSwords /> Classes</h5>
              <p className="card-text text-muted" style={{ fontSize: "0.88rem" }}>Warrior, Mage, Rogue, Cleric, Ranger — full breakdowns.</p>
              <Link to="/docs/classes" className="btn btn-sm btn-outline-primary">Browse</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title"><FaGear /> Mechanics</h5>
              <p className="card-text text-muted" style={{ fontSize: "0.88rem" }}>Combat, crafting, PvP, dungeons, economy.</p>
              <Link to="/docs/mechanics" className="btn btn-sm btn-outline-primary">Browse</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}