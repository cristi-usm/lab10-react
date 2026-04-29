import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DocsLayout() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="docs-wrapper">
          <Sidebar />
          <main className="docs-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
