"use client";
import { useEffect } from 'react';

export default function DevToolsBlocker() {
  useEffect(() => {
    // Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Chặn chuột phải
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Phát hiện DevTools mở bằng cách kiểm tra kích thước cửa sổ
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools đang mở - có thể redirect hoặc hiển thị cảnh báo
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#000;color:#fff;"><h1>⚠️ Vui lòng đóng Developer Tools</h1></div>';
      }
    };

    // Phát hiện debugger
    const antiDebugger = () => {
      setInterval(() => {
        debugger;
      }, 100);
    };

    // Chặn console
    const disableConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp'];
      
      methods.forEach(method => {
        window.console[method] = noop;
      });
    };

    // Kích hoạt các biện pháp bảo vệ
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Kiểm tra DevTools mỗi 1 giây
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    // Kích hoạt anti-debugger (tùy chọn - có thể gây lag)
    // antiDebugger();
    
    // Vô hiệu hóa console
    disableConsole();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(devToolsInterval);
    };
  }, []);

  return null;
}
