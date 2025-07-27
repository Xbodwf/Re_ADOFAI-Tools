import React, { useState } from 'react';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import ForumIcon from '@material-ui/icons/Forum';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'home',
      label: '首页',
      icon: <HomeWorkIcon style={{ color: '#ffffff' }}/>,
      tooltip: '首页'
    },
    {
      id: 'tools',
      label: '工具',
      icon: <AppsIcon style={{ color: '#ffffff' }}/>,
      tooltip: '工具'
    },
    {
      id: 'settings',
      label: '设置',
      icon: <SettingsIcon style={{ color: '#ffffff' }}/>,
      tooltip: '设置'
    },
    {
      id: 'community',
      label: '社区',
      icon: <ForumIcon style={{ color: '#ffffff' }}/>,
      tooltip: '社区'
    }
  ];

  const handleItemClick = (itemId) => {
    if (onTabChange) {
      onTabChange(itemId);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              title={item.tooltip}
            >
              <div className="sidebar-icon">
                {typeof item.icon == 'string' ? <img src={item.icon} alt={item.label} /> : item.icon}
              </div>
              
              {/* 悬停时显示的工具提示 */}
              {hoveredItem === item.id && (
                <div className="sidebar-tooltip">
                  {item.tooltip}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* 预留空间给未来的工具按钮 */}
        <div className="sidebar-footer">
          {/* 这里可以添加更多工具按钮 */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;