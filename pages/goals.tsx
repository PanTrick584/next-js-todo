import { useContextAPI } from "@/context/createContext";
import { getDay, getMonth, summaryDate } from "@/utils/const";
import { ReactNode, useState } from "react";

const GoalsPage = () => {
    const [addGoal, setAddGoal] = useState<string>("");

    const goalsDate = summaryDate();

    const goalsContextAPI = useContextAPI().goals;
    const goalsUniqueDates = useContextAPI().goalsDates;
    const setGoalsContextAPI = useContextAPI().setGoals;
    const setGoalsUniqueDates = useContextAPI().setGoalsDates;

    const goalsAddContextHandler = () => {
        setGoalsContextAPI((prev) => [
            ...prev,
            {
                text: addGoal,
                date: goalsDate,
            },
        ]);
        setAddGoal("");
    };

    const goalsDatesHandler = () => {
        let sameDate = goalsContextAPI.find((uniqueDate): boolean => {
            let newUniqueDate = uniqueDate.date === goalsDate ? true : false;

            return newUniqueDate;
        });

        if (!sameDate) {
            setGoalsUniqueDates((prev) => [...prev, goalsDate]);
        }
    };

    return (
        <div>
            <label htmlFor="goal">
                <input
                    onChange={(e) => setAddGoal(e.target.value)}
                    value={addGoal}
                    type="text"
                    name="goal"
                />
            </label>
            <button
                onClick={() => {
                    goalsAddContextHandler();
                    goalsDatesHandler();
                }}
            >
                Kliknij mnie żeby dodać CEL
            </button>
            <div>
                {goalsUniqueDates.map((uniqueDate, id): ReactNode => {
                    return (
                        <div key={id}>
                            <div>{uniqueDate}</div>
                            {goalsContextAPI.map(
                                (goal, id: number): ReactNode => {
                                    if (uniqueDate === goal.date) {
                                        return (
                                            <div key={id}>
                                                <p>{goal.text}</p>
                                            </div>
                                        );
                                    }
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GoalsPage;
