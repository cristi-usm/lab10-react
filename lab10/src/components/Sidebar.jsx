import { NavLink } from 'react-router-dom';
import data from '../data/docs.json';

export default function Sidebar() {
    const { sectiuni, pagini } = data;

    return (
        <aside className="sidebar">
            {sectiuni.map(sec => {
                const paginile = pagini.filter(p => p.sectiune === sec.id);
                return (
                    <div className="sidebar-section" key={sec.id}>
                        <div className="sidebar-section-title">
                            <span>{sec.icon}</span>
                            <NavLink
                                to={`/docs/${sec.id}`}
                                end
                                className={({ isActive }) =>
                                    'sidebar-section-link' + (isActive ? ' active' : '')
                                }
                            >
                                {sec.titlu}
                            </NavLink>
                        </div>
                        {paginile.map(page => (
                            <NavLink
                                key={page.id}
                                to={`/docs/${sec.id}/${page.id}`}
                                className={({ isActive }) =>
                                    'sidebar-link' + (isActive ? ' active' : '')
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{page.titlu}</span>
                                        {isActive && <span className="sidebar-check">✓</span>}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                );
            })}
        </aside>
    );
}
