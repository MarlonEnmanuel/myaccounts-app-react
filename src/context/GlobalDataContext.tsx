import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { InitialDataDto } from "../api";

interface GlobalDataContextType {
    globalData?: InitialDataDto,
    setGlobalData: Dispatch<SetStateAction<InitialDataDto|undefined>>,
};

const InitialDataContext = createContext<GlobalDataContextType>({
    setGlobalData: async () => {},
});

export const InitialDataContextProvider: React.FCWC = (props) => {

    const [data, setData] = useState<InitialDataDto>();

    var providerValue:GlobalDataContextType = {
        globalData: data,
        setGlobalData: setData,
    };

    return (
        <InitialDataContext.Provider value={providerValue}>
            {props.children}
        </InitialDataContext.Provider>
    );
};

export const useGlobalDataContext = () => {
    var { globalData, setGlobalData } = useContext(InitialDataContext);
    return {
        setGlobalData,
        ...globalData,
        cards: globalData?.cards ?? [],
        persons: globalData?.persons ?? [],
    };
};