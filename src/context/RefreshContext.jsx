import { createContext, useContext, useState } from "react";

const RefreshContext = createContext(null);

export const RefreshProvider = ({ children }) => {
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  const triggerTransactionRefresh = () => {
    setRefreshTransactions((prev) => !prev); // toggle
  };

  return (
    <RefreshContext.Provider
      value={{ refreshTransactions, triggerTransactionRefresh }}
    >
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error("useRefresh must be used inside RefreshProvider");
  }
  return context;
};