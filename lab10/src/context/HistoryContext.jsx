import { createContext, useContext, useState, useCallback } from 'react';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
    const [history, setHistory] = useState([]);

    const addToHistory = useCallback((entry) => {
        setHistory(prev => {
            const filtered = prev.filter(h => h.path !== entry.path);
            return [entry, ...filtered].slice(0, 10);
        });
    }, []);

    const clearHistory = useCallback(() => setHistory([]), []);

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    return useContext(HistoryContext);
}
