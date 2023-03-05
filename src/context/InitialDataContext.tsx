import { createContext, useCallback, useContext, useState } from "react";
import API from "../api/API";
import { InitialDataDto } from "../api/models/InitialDataDto";

type InititalDataContextType = {
    initialData: InitialDataDto,
    loadInititalData: (signal?:AbortSignal) => Promise<void>,
}

const defaultValue: InititalDataContextType = {
    initialData: { user: {id: 0, name: ''}, persons: [], cards: [] },
    loadInititalData: async () => {},
}

const InitialDataContext = createContext<InititalDataContextType>(defaultValue);

export const InitialDataContextProvider: React.FCWC = (props) => {

    const [initialData, setInitialData] = useState<InitialDataDto>(defaultValue.initialData);

    const loadInititalData = useCallback(async (signal?:AbortSignal) => {
        const resp = await API.general.getInitialData(signal);
        setInitialData(resp);
    }, []);

    const value = {
        initialData,
        loadInititalData,
    };

    return (
        <InitialDataContext.Provider value={value}>
            {props.children}
        </InitialDataContext.Provider>
    );
};

export const useInitialDataContext = () => useContext(InitialDataContext);