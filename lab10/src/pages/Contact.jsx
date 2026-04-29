export default function Contact() {
    return (
        <div className="simple-page">
            <h1>Contact</h1>
            <p>
                Pentru întrebări despre NexusJS, poți deschide un issue pe GitHub sau
                scrie pe Discord-ul comunității.
            </p>
            <p>
                Email: <a href="mailto:hello@nexusjs.dev" style={{ color: 'var(--accent)' }}>
                    hello@nexusjs.dev
                </a>
            </p>
            <p>
                Discord: <a href="#" style={{ color: 'var(--accent)' }}>discord.gg/nexusjs</a>
            </p>
        </div>
    );
}
