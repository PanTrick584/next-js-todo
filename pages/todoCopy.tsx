import { useContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import { summaryDate } from "@/utils/const";
import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";

interface newTodoMutation {
    title?: string;
    description?: string;
    date?: string;
}

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

export default function ProductsPage({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const goalsDate = summaryDate(),
        [todoMutation, setTodoMutation] = useState<newTodoMutation>({
            title: "",
            description: "",
            date: goalsDate,
        }),
        [newData, setNewData] = useState<boolean>(false),
        goalsContextAPI = useContextAPI().goals,
        setGoalsContextAPI = useContextAPI().setGoals;

    console.log(goalsDate);

    useEffect(() => {
        setGoalsContextAPI(data.goals);
    }, []);

    useEffect(() => {
        populateTODO();
    }, [newData]);

    let send = {
        title: "KLIENMT!!!!! kolejne zadanie an dziś",
        description: "nie wiem weź się gościu do roboty czy coś",
        date: goalsDate,
        goalID: 69,
    };

    const MUTATION = gql`
        mutation AddGoal($goal: GoalCreateInput!) {
            goal: createGoal(data: $goal) {
                id
                title
                description
                date
                goalID
            }
        }
    `;

    const populateTODO = () => {
        return goalsContextAPI.map((goal) => {
            return (
                <div>
                    <div>
                        {goal.title} {goal.goalID}
                    </div>
                    <div>{goal.description}</div>
                    <div>{goal.date}</div>
                </div>
            );
        });
    };

    const addMutation = async () => {
        const dataSend = await endpoint.mutate({
            mutation: MUTATION,
            variables: {
                goal: send,
            },
        });

        setGoalsContextAPI((prev) => [...prev, dataSend.data.goal]);
        setNewData(!newData);
        console.log(dataSend.data.goal);
    };

    console.log(todoMutation);

    return (
        <div>
            <label htmlFor="todo-title">
                <input
                    onChange={(e) =>
                        setTodoMutation((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    value={todoMutation.title}
                    type="text"
                    name="todo-title"
                />
            </label>
            <label htmlFor="todo-description">
                <textarea
                    onChange={(e) =>
                        setTodoMutation((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    value={todoMutation.description}
                    name="todo-description"
                />
            </label>
            <button onClick={() => addMutation()}>DODAJ CEL</button>
            {populateTODO()}
        </div>
    );
}

export const getStaticProps = async () => {
    const { data } = await endpoint.query<StoreAPIQL>({
        query: gql`
            query Goals {
                goals {
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
