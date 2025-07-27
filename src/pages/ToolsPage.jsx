import React, { useState, useEffect, useRef } from 'react';
import IFrame from '../components/IFrame';
import './ToolsPage.css';

const ToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const iframeRef = useRef(null);

  // 获取工具列表
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://adofaitools.top/api/get_tools.php');
        if (!response.ok) {
          throw new Error('获取工具列表失败');
        }
        const data = await response.json();
        setTools(data.tools || []);
        // 默认选中第一个工具
        if (data.tools && data.tools.length > 0) {
          setSelectedTool(data.tools[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error('获取工具列表失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const handleDownload = (tool) => {
    // 暂时只是样式，不实现实际下载功能
    console.log('下载工具:', tool.name);
    alert(`下载功能开发中...\n工具: ${tool.name}`);
  };

  if (loading) {
    return (
      <div className="tools-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>正在加载工具列表...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tools-page">
        <div className="error-container">
          <h2>加载失败</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>重试</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tools-page">
      <div className="tools-left-panel">
        {/* 工具详情区域 */}
        <div className="tool-details">
          {selectedTool ? (
            <>
              <div className="tool-header">
                <img 
                  src={selectedTool.icon} 
                  alt={selectedTool.name}
                  className="tool-icon"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIzMiIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VG9vbDwvdGV4dD4KPHN2Zz4K';
                  }}
                />
                <div className="tool-info">
                  <h2>{selectedTool.name}</h2>
                  <div className="tool-meta">
                    <span className="version">{selectedTool.version}</span>
                    <span className="downloads">{selectedTool.downloads} 下载</span>
                    <span className="release-date">{formatDate(selectedTool.releaseDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="tool-author">
                <img 
                  src={selectedTool.author.avatar} 
                  alt={selectedTool.author.name}
                  className="author-avatar"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjY2NjYiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iNSIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNiAyNmMwLTUuNSA0LjUtMTAgMTAtMTBzMTAgNC41IDEwIDEwIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="author-info">
                  <span className="author-name">{selectedTool.author.name}</span>
                  <a 
                    href={selectedTool.author.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="author-link"
                  >
                    查看主页
                  </a>
                </div>
              </div>

              <div className="tool-actions">
                <div className="action-buttons">
                  <button 
                    className="btn-description"
                    onMouseEnter={() => setHoveredTooltip('description')}
                    onMouseLeave={() => setHoveredTooltip(null)}
                  >
                    简介
                    {hoveredTooltip === 'description' && (
                      <div className="tooltip">
                        {selectedTool.description}
                      </div>
                    )}
                  </button>
                  
                  {selectedTool.changelog && (
                    <button 
                      className="btn-changelog"
                      onMouseEnter={() => setHoveredTooltip('changelog')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    >
                      更新日志
                      {hoveredTooltip === 'changelog' && (
                        <div className="tooltip changelog-tooltip">
                          {selectedTool.changelog.split('\r\n').map((line, index) => (
                            <div key={index}>{line}</div>
                          ))}
                        </div>
                      )}
                    </button>
                  )}
                </div>
                
                <button 
                  className="btn-download"
                  onClick={() => handleDownload(selectedTool)}
                >
                  下载工具
                </button>
              </div>
            </>
          ) : (
            <div className="no-tool-selected">
              <p>请选择一个工具查看详情</p>
            </div>
          )}
        </div>

        {/* 工具列表区域 */}
        <div className="tools-list">
          <h3>工具列表</h3>
          <div className="tools-grid">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                className={`tool-item ${selectedTool?.id === tool.id ? 'selected' : ''}`}
                onClick={() => handleToolSelect(tool)}
              >
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  className="tool-item-icon"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VG9vbDwvdGV4dD4KPHN2Zz4K';
                  }}
                />
                <div className="tool-item-info">
                  <h4>{tool.name}</h4>
                  <p>{tool.description}</p>
                  <div className="tool-item-meta">
                    <span>{tool.version}</span>
                    <span>{tool.downloads} 下载</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧文档区域 */}
      <div className="tools-right-panel">
        <div className="documentation-container">
          {selectedTool && selectedTool.documentation ? (
            <IFrame
              ref={iframeRef}
              src={selectedTool.documentation}
              className="documentation-iframe"
              title={`${selectedTool.name} 文档`}
              onLoad={() => console.log('文档加载完成')}
              onError={() => console.error('文档加载失败')}
              allowFullScreen={false}
              loading="eager"
            />
          ) : (
            <div className="no-documentation">
              <h3>文档预览</h3>
              <p>选择工具后将在此处显示相关文档</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;