import { useContextAPI } from "@/context/createContext";
import { ReactNode } from "react";

export const GoalElements = () => {
    const goalsContextAPI = useContextAPI().goals;
    const goalsUniqueDates = useContextAPI().goalsDates;
    const setGoalsContextAPI = useContextAPI().setGoals;

    const deleteGoalHandler = (goalID: number) => {
        let filteredGoals = goalsContextAPI.filter(
            (goal) => goal.id !== goalID
        );
        setGoalsContextAPI(() => [...filteredGoals]);
    };

    return (
        <div>
            {goalsUniqueDates.map((uniqueDate, id): ReactNode => {
                return (
                    <div key={id}>
                        <div>{uniqueDate}</div>
                        {goalsContextAPI.map((goal, id: number): ReactNode => {
                            if (uniqueDate === goal.date) {
                                return (
                                    <div key={id}>
                                        <p>{goal.text}</p>
                                        <button
                                            onClick={() =>
                                                deleteGoalHandler(goal.id)
                                            }
                                        >
                                            USUŃ
                                        </button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};
