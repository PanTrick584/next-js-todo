import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

interface GoalItem {
    id: string;
    title: string;
    description: string;
    date: string;
    goalID: number;
}

interface MainState {
    todos: GoalItem[];
    goals: GoalItem[];
    goalsDates: string[];
    uniqueID: number;
    setTodos: Dispatch<SetStateAction<GoalItem[]>>;
    setGoals: Dispatch<SetStateAction<GoalItem[]>>;
    setGoalsDates: Dispatch<SetStateAction<string[]>>;
    setUniqueID: Dispatch<SetStateAction<number>>;
}

export const MainContext = createContext<MainState | null>(null);

export const ContextAPI = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<GoalItem[]>([]);
    const [goalsDates, setGoalsDates] = useState<string[]>([]);
    const [goals, setGoals] = useState<GoalItem[]>([]);
    const [uniqueID, setUniqueID] = useState<number>(0);

    useEffect(() => {
        let uniq = todos
            .filter(({ date }, index, a) => {
                console.log(date);

                return a.findIndex((e) => date === e.date) === index;
            })
            .map((goal) => goal.date);

        setGoalsDates(uniq);
    }, []);

    if (goals.length !== 0) {
    }

    return (
        <MainContext.Provider
            value={{
                todos,
                setTodos,
                goals,
                setGoals,
                goalsDates,
                setGoalsDates,
                uniqueID,
                setUniqueID,
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
