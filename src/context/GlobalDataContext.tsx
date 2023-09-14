import { createContext, useContext } from "react";
import { API, InitialDataDto } from "../api";
import { useApiSubmit } from "../shared/useApiRequest";

interface GlobalDataContextType extends InitialDataDto {
    loadGlobalData: () => Promise<void>
};

const defaultValue: GlobalDataContextType = {
    user: {id: 0, name: '', personId: 0}, 
    persons: [], 
    cards: [], 
    loadGlobalData: async () => {},
}

const InitialDataContext = createContext<GlobalDataContextType>(defaultValue);

export const InitialDataContextProvider: React.FCWC = (props) => {

    const { result, submit } = useApiSubmit(API.general.getInitialData);

    var providerValue = {
        ...(result ?? defaultValue),
        loadGlobalData: async () => await submit({}),
    };

    return (
        <InitialDataContext.Provider value={providerValue}>
            {props.children}
        </InitialDataContext.Provider>
    );
};

export const useGlobalDataContext = () => useContext(InitialDataContext);