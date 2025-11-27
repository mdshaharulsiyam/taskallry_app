import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";

interface GlobalContextType {
  role: "user" | "service" | null;
  setRole: React.Dispatch<React.SetStateAction<"user" | "service" | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<"user" | "service" | null>(null);
  const value: GlobalContextType = {
    role,
    setRole,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalContextProvider;
