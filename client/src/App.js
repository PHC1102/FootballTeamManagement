import React, { useState } from 'react';
import './App.css';
import PlayerView from './views/PlayerView/PlayerView';
import LineupView from './views/LineupView/LineupView';
import MarketView from './views/MarketView/MarketView';
import backgroundImage from './EA_SPORTS_FC_25_-_Cover.jpg';

function App() {
  const [activeView, setActiveView] = useState(null); // No default view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App" style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`
    }}>
      <div className="app-container">
        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Football Manager</h2>
          </div>
          <ul className="sidebar-menu">
            <li 
              className={activeView === 'players' ? 'active' : ''}
              onClick={() => {
                setActiveView('players');
                setIsSidebarOpen(false);
              }}
            >
              Players
            </li>
            <li 
              className={activeView === 'market' ? 'active' : ''}
              onClick={() => {
                setActiveView('market');
                setIsSidebarOpen(false);
              }}
            >
              Market
            </li>
            <li 
              className={activeView === 'lineups' ? 'active' : ''}
              onClick={() => {
                setActiveView('lineups');
                setIsSidebarOpen(false);
              }}
            >
              Lineups
            </li>
          </ul>
        </div>
        
        {/* Overlay for mobile */}
        {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
        
        {/* Main Content - only show when a view is selected */}
        {activeView && (
          <div className="main-content">
            {activeView === 'players' && <PlayerView />}
            {activeView === 'market' && <MarketView />}
            {activeView === 'lineups' && <LineupView />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;