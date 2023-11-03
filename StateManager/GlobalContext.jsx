'use client'
import { createContext, useContext, useMemo, useReducer } from "react";
import { GlobalReducer, initialGlobalState } from "./GlobalReducer";
import useLocalStorage from "./useLocalStorage";

const GlobalContext = createContext()

export const GlobalWrapper = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialGlobalState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    useLocalStorage(state, dispatch, initialGlobalState)
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}