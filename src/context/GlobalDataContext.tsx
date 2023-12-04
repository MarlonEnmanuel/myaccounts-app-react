import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { AuthDataDto } from "../api";

interface GlobalDataContextType {
    authData?: AuthDataDto,
    setAuthData: Dispatch<SetStateAction<AuthDataDto|undefined>>,
};

const InitialDataContext = createContext<GlobalDataContextType>({
    setAuthData: async () => {},
});

export const InitialDataContextProvider: React.FCWC = (props) => {

    const [data, setData] = useState<AuthDataDto>();

    var providerValue:GlobalDataContextType = {
        authData: data,
        setAuthData: setData,
    };

    return (
        <InitialDataContext.Provider value={providerValue}>
            {props.children}
        </InitialDataContext.Provider>
    );
};

export const useAuthDataContext = () => {
    var { authData, setAuthData } = useContext(InitialDataContext);
    return {
        setAuthData,
        user: authData?.user,
        cards: authData?.cards ?? [],
        persons: authData?.persons ?? [],
    };
};