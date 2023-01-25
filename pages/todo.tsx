import { useContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import { summaryDate } from "@/utils/const";
import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";

interface newTodoMutation {
    title: string;
    description: string;
    date: string;
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
    // data z jakeigoś powodu nie przechodzi do bazy przez mutację
    const goalsDate = summaryDate();
    const [todoMutation, setTodoMutation] = useState<newTodoMutation>({
        title: "",
        description: "",
        date: goalsDate,
    });
    const [newData, setNewData] = useState<boolean>(false);
    const goalsContextAPI = useContextAPI().goals;
    const setGoalsContextAPI = useContextAPI().setGoals;
    const goalsUniqueDates = useContextAPI().goalsDates;
    const setGoalsUniqueDates = useContextAPI().setGoalsDates;

    useEffect(() => {
        setGoalsContextAPI(data.goals);
    }, []);

    useEffect(() => {
        populateTODO();
    }, [newData]);

    const MUTATION_SEND = gql`
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

    // const MUTATION_PUBLISH = gql`
    //     mutation PublishGoal(where){
    //         publishGoal(
    //             where: { id: "cldc31ipa0mps0av074t15lq1" }
    //             to: PUBLISHED
    //         ) {
    //             id
    //         }
    //     }
    // `;

    const MUTATION_PUBLISH = gql`
        mutation PublishGoal($where: GoalWhereUniqueInput!, $to: [Stage!]!) {
            publishGoal(where: $where, to: $to) {
                id
            }
        }
    `;

    // {
    //     "where": {
    //       "id": "cldc3teg70ntn0bw5ckswfpfq"
    //     },
    //       "to": ["PUBLISHED"]
    //   }

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

    const sendQuery = async () => {
        return ({ data } = await endpoint.query<StoreAPIQL>({
            query: gql`
                query Goals {
                    goals(first: 20) {
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
        }));
    };

    const addMutation = async () => {
        const dataSend = await endpoint.mutate({
            mutation: MUTATION_SEND,
            variables: {
                goal: todoMutation,
            },
        });

        const dataID = await endpoint.mutate({
            mutation: MUTATION_PUBLISH,
            variables: {
                where: { id: dataSend.data.goal.id },
                to: ["PUBLISHED"],
            },
        });

        // mógłbym wykonywać to query tylko do elementów, których nie mam
        const newQuery = sendQuery();

        const newQueryData = (await newQuery).data.goals;

        setGoalsContextAPI(newQueryData);
        setNewData(!newData);
        //pobrać stąd id, przesłąć je do kolejnej mutacji i wysłać z flagą publish
        // mutation {
        //     publishGoal(where: {id: "cldc31ipa0mps0av074t15lq1"}, to: PUBLISHED) {
        //       id
        //     }
        //   }
        console.log(dataSend.data.goal.id);
        console.log(dataID);
        console.log(newQueryData);
    };

    console.log(goalsContextAPI);
    console.log(goalsUniqueDates);

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
    // można ustawić ilość elementów przy pierwszym zapytaniu
    // to dobre wyzwanie żeby wyświetlać tylko te z bieżącego tygodnia i o ograniczonej ilości?
    const { data } = await endpoint.query<StoreAPIQL>({
        query: gql`
            query Goals {
                goals(first: 20) {
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
