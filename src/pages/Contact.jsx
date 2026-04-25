

export const Contact = () =>{
    return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
        <h4 className="fw-bold mb-3">Contact</h4>
        <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
        Spotted an error or want to contribute? Reach us here.
        </p>
        <div className="list-group">
        <div className="list-group-item">
            <div className="fw-semibold mb-1">Discord</div>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-primary" style={{ fontSize: "0.85rem" }}>discord.gg/aethermoor</a>
        </div>
        <div className="list-group-item">
            <div className="fw-semibold mb-1">Reddit</div>
            <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="text-primary" style={{ fontSize: "0.85rem" }}>r/AethermoorChronicles</a>
        </div>
        <div className="list-group-item">
            <div className="fw-semibold mb-1">Email</div>
            <a href="mailto:wiki@aethermoor.gg" className="text-primary" style={{ fontSize: "0.85rem" }}>wiki@aethermoor.gg</a>
        </div>
        </div>
    </div>
    )
}