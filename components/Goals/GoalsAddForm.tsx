import { useContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import { summaryDate } from "@/utils/const";
import { gql } from "@apollo/client";
import { useState } from "react";

// export default function GoalsAddForm({
//     data,
// }: InferGetStaticPropsType<typeof getStaticProps>) {

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

interface StoreAPIQL {
    goals: Product[];
}

interface Product {
    id: string;
    title: string;
    description: string;
    date: string;
    goalID: number;
}

export const getStaticProps = async () => {
    // można ustawić ilość elementów przy pierwszym zapytaniu
    // to dobre wyzwanie żeby wyświetlać tylko te z bieżącego tygodnia i o ograniczonej ilości?
    const { data } = await endpoint.query<StoreAPIQL>({
        query: gql`
            query Goals {
                goals(first: 50) {
                    createdAt
                    date
                    description
                    display
                    goalID
                    id
                    title
                }
            }
        `,
    });

    return {
        props: {
            data,
        },
    };
};
