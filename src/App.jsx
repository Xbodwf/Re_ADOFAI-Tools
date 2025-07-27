import React, { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import SettingsPage from './pages/SettingsPage'
import { navigateIFrame } from './components/IFrame';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home'); // 当前激活的标签页

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // 这里预留给未来的页面切换逻辑
    console.log('切换到标签页:', tabId);
  };

  // 导航控制函数 - 直接调用 IFrame 组件的 API
  const handleNavigate = (action) => {
    const success = navigateIFrame(action);
    if (success) {
      console.log(`导航操作 ${action} 执行成功`);
    } else {
      console.log(`导航操作 ${action} 执行失败`);
    }
  };

  const renderMainContent = () => {
    // 根据activeTab渲染不同的内容
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'tools':
        return <ToolsPage />;
      case 'online-tools':
        return (
          <div className="time-container">
            <h1>在线工具</h1>
            <p className="page-description">这里将显示在线工具</p>
          </div>
        );
      case 'community':
        return (
          <div className="time-container">
            <h1>社区</h1>
            <p className="page-description">这里将显示社区内容</p>
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <TitleBar onNavigate={handleNavigate} />
      <div className="app-body">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
