import { createContext, useContext, useState, useEffect } from "react";
import { DashbaordOverview } from  '../auth/dashboard'

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState({
    stats:{},
    devices:[]
  });
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    const res = await DashbaordOverview();
     if (res.success) {
    setDashboard({
      stats: {
        activeSub: res.data.activeSubscriptions,
        credits: res.data.credits,
        pending: res.data.pendingRequests,
        totalUsers: res.data.totalUsers,
        creditCoin: res.data.credits,
      },
      devices: res.data.recentUsers || [],
    });
  } else {
    console.error(res.message);
  }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ dashboard, loading, refetchDashboard: fetchDashboard }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);