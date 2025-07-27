import React, { useState, useEffect } from 'react';
import './TitleBar.css';
import { deflate } from 'node:zlib';
import { Interface } from 'node:readline';

const TitleBar = ({ onNavigate }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // 检查初始窗口状态
    const checkWindowState = async () => {
      if (window.electronAPI) {
        const maximized = await window.electronAPI.windowControl('isMaximized');
        setIsMaximized(maximized);
      }
    };

    checkWindowState();

    // 监听窗口状态变化
    if (window.electronAPI) {
      window.electronAPI.onWindowStateChanged((state) => {
        setIsMaximized(state === 'maximized');
      });
    }

    // 清理监听器
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('window-state-changed');
      }
    };
  }, []);

  const handleWindowControl = async (action) => {
    if (window.electronAPI) {
      const result = await window.electronAPI.windowControl(action);
      if (action === 'maximize') {
        setIsMaximized(result);
      }
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('back');
    }
  };

  const handleForward = () => {
    if (onNavigate) {
      onNavigate('forward');
    }
  };

  const handleRefresh = () => {
    if (onNavigate) {
      onNavigate('refresh');
    }
  };

  return (
    <div className="titlebar">
      <div className="titlebar-left">
        <div className="app-info">
          <div className="app-icon">
            {/*<img src="./assets/icon/icon.png" alt="ADOFAI Tools" />*/}
          </div>
          <div className="app-title">ADOFAI-Tools</div>
        </div>
        
        <div className="navigation-buttons">
          <button 
            className="navigation-button" 
            onClick={handleBack}
            title="后退"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button 
            className="navigation-button" 
            onClick={handleForward}
            title="前进"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
          
          <button 
            className="navigation-button" 
            onClick={handleRefresh}
            title="刷新"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="titlebar-right">
        <button 
          className="titlebar-button minimize-button"
          onClick={() => handleWindowControl('minimize')}
          title="最小化"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2" y="5" width="8" height="2" fill="currentColor"/>
          </svg>
        </button>
        
        <button 
          className="titlebar-button maximize-button"
          onClick={() => handleWindowControl('maximize')}
          title={isMaximized ? "还原" : "最大化"}
        >
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="2" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="4" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          )}
        </button>
        
        <button 
          className="titlebar-button close-button"
          onClick={() => handleWindowControl('close')}
          title="关闭"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;