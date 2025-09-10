import { createContext, useContext, useState, useEffect } from 'react';

// Status Context
const StatusContext = createContext();

// Status Provider
export function StatusProvider({ children }) {
  const [status, setStatus] = useState(() => {
    // Get status from localStorage or default to 'available'
    return localStorage.getItem('userStatus') || 'available';
  });
  
  const [lastUpdated, setLastUpdated] = useState(() => {
    return localStorage.getItem('statusLastUpdated') || new Date().toISOString();
  });

  // Save status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userStatus', status);
    localStorage.setItem('statusLastUpdated', lastUpdated);
  }, [status, lastUpdated]);

  // Update status and timestamp
  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    setLastUpdated(new Date().toISOString());
  };

  // Simulate occasional status updates (for demo purposes)
  useEffect(() => {
    const statuses = ['available', 'busy', 'away'];
    const interval = setInterval(() => {
      // For demo purposes, randomly change status occasionally
      if (Math.random() < 0.05) { // 5% chance every 60 seconds (less frequent)
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        updateStatus(randomStatus);
      }
    }, 60000); // Check every 60 seconds instead of 30

    return () => clearInterval(interval);
  }, []);

  // Auto-update timestamp every minute for "last updated" display
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toISOString());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const value = {
    status,
    lastUpdated,
    updateStatus,
    // Status configurations
    statusConfig: {
      available: {
        color: '#10B981',
        bgColor: '#D1FAE5',
        icon: '✅',
        priority: 1
      },
      busy: {
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        icon: '⏳',
        priority: 2
      },
      away: {
        color: '#EF4444',
        bgColor: '#FEE2E2',
        icon: '🔴',
        priority: 3
      }
    }
  };

  return (
    <StatusContext.Provider value={value}>
      {children}
    </StatusContext.Provider>
  );
}

// Custom hook to use status context
export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
}

// Utility function to get human-readable time difference
export function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMinutes = Math.floor((now - past) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

export default StatusContext;
