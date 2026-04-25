import docs from "../data/docs.json"

export const About = ()=> {

    const totalArticles = docs.length;
    const totalSections = [...new Set(docs.map((d) => d.section))].length;

    return (
        <div className="container py-5" style={{ maxWidth: "600px" }}>
            <h4 className="fw-bold mb-3">About This Wiki</h4>
            <p className="text-muted">
            The Aethermoor Chronicles Wiki is a community-maintained guide covering every mechanic, class, and secret in the game.
            Not officially affiliated with the developers.
            </p>
            <div className="card mt-4">
            <div className="card-body">
                <p className="fw-semibold mb-1">Stats</p>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    {totalArticles} articles · {totalSections} sections · Updated weekly</p>
            </div>
            </div>
        </div>
        )
}