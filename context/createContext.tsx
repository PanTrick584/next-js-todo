import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

interface MainState {
    todos: string[];
    goals: string[];
    setTodos: Dispatch<SetStateAction<string[]>>;
    setGoals: Dispatch<SetStateAction<string[]>>;
}

export const MainContext = createContext<MainState | null>(null);

// export const useContextAPI = () => useContext(MainContext);

export const ContextAPI = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<string[]>([]);
    const [goals, setGoals] = useState<string[]>([]);

    return (
        <MainContext.Provider
            value={{
                todos,
                setTodos,
                goals,
                setGoals,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export const useContextAPI = () => {
    const state = useContext(MainContext);
    if (!state) throw new Error("You forgot CartStateContextProvider");
    return state;
};
