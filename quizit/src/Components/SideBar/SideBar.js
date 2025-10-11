import './SideBar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SideBar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [toggleText, setToggleText] = useState("Close");

  const toggleSideBar = () => {
    setCollapsed(prev => {
      const newState = !prev;
      setToggleText(newState ? "Open" : "Close");
      return newState;
    });
  };

  return (
    <aside id="SideBar" className={collapsed ? 'collapsed' : ''}>
      <nav>
        <div className="sid-bar-top">
          <h1>Hello!</h1>
          <button onClick={toggleSideBar}>{toggleText}</button>
        </div>
        <ul className="side-bar-menu">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/landing')}>Question Generator</li>
          <li onClick={() => navigate('/test')}>Quiz Me!</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;