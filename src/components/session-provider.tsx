import { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ accessToken, children }: { accessToken: string, children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(accessToken);

    return (
        <SessionContext.Provider value={{ token, setToken }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) throw new Error("useSession must be used within a SessionProvider");
    return context;
};