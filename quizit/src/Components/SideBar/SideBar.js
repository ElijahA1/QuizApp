import './SideBar.css';
import { useState } from 'react';

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSideBar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <aside id="SideBar" className={collapsed ? 'collapsed' : ''}>
      <nav>
        <div className="sid-bar-top">
          <img alt="Profile" />
          <button onClick={toggleSideBar}>Click</button>
        </div>
        <ul className="side-bar-menu">
          <li>Area</li>
          <li>Area</li>
          <li>Area</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
