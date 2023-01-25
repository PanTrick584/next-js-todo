import { useContextAPI } from "@/context/createContext";
import { summaryDate } from "@/utils/const";
import { useState } from "react";

export const GoalsAddForm = () => {
    const [addGoal, setAddGoal] = useState<string>("");

    const goalsDate = summaryDate();

    const goalsContextAPI = useContextAPI().goals;
    const goalsUniqueDates = useContextAPI().goalsDates;
    const setGoalsContextAPI = useContextAPI().setGoals;
    const setGoalsUniqueDates = useContextAPI().setGoalsDates;
    const goalsUniqueID = useContextAPI().uniqueID;
    const setGoalsUniqueID = useContextAPI().setUniqueID;

    const goalsAddContextHandler = () => {
        setGoalsUniqueID((prev: number): number => {
            return (prev = prev + 1);
        });
        setGoalsContextAPI((prev) => [
            ...prev,
            {
                date: goalsDate,
                id: "goalsUniqueID",
                goalID: 3,
                title: "",
                description: "",
            },
        ]);
        setAddGoal("");

        console.log(goalsContextAPI);
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
        <>
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
        </>
    );
};
