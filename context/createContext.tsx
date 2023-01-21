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
    text: string;
    date: string;
}

interface MainState {
    todos: string[];
    goals: GoalItem[];
    goalsDates: string[];
    setTodos: Dispatch<SetStateAction<string[]>>;
    setGoals: Dispatch<SetStateAction<GoalItem[]>>;
    setGoalsDates: Dispatch<SetStateAction<string[]>>;
}

export const MainContext = createContext<MainState | null>(null);

export const ContextAPI = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<string[]>([]);
    const [goalsDates, setGoalsDates] = useState<string[]>([]);
    const [goals, setGoals] = useState<GoalItem[]>([
        { text: "ajajajajaj", date: "Piątek - 17 Stycznia - 2023" },
        { text: "ajajajajaj", date: "Piątek - 17 Stycznia - 2023" },
        { text: "ajajajajaj", date: "Piątek - 17 Stycznia - 2023" },
        { text: "ajajajajaj", date: "Piątek - 12 Stycznia - 2023" },
        { text: "ajajajajaj", date: "Piątek - 12 Stycznia - 2023" },
    ]);

    useEffect(() => {
        let uniq = goals
            .filter(
                ({ date }, index, a) =>
                    a.findIndex((e) => date === e.date) === index
            )
            .map((goal) => goal.date);

        console.log(uniq);

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
