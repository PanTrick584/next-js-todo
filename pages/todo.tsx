import { useContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import { summaryDate } from "@/utils/const";
import { gql, useQuery } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState, ReactNode } from "react";

interface newTodoMutation {
    title: string;
    description: string;
    date: string;
}

export default function ProductsPage() {
    // export default function ProductsPage({
    //     data,
    // }: InferGetStaticPropsType<typeof getStaticProps>) {
    const goalsDate = summaryDate();

    const [todoMutation, setTodoMutation] = useState<newTodoMutation>({
        title: "",
        description: "",
        date: goalsDate,
    });
    const [newData, setNewData] = useState<boolean>(false);

    const goalsContextAPI = useContextAPI().goals;
    const setGoalsContextAPI = useContextAPI().setGoals;
    const todoUniqueDates = useContextAPI().goalsDates;
    const setTodoUniqueDates = useContextAPI().setGoalsDates;

    useEffect(() => {
        // setGoalsContextAPI(data.goals);
        // setGoalsContextAPI();
        // sendQuery();
        // let uniq = goalsContextAPI
        //     .filter(({ date }, index, a) => {
        //         return a.findIndex((e) => date === e.date) === index;
        //     })
        //     .map((goal) => goal.date);
        // setTodoUniqueDates(uniq);
        // todosQuery();
    }, []);

    useEffect(() => {
        populateTODO();
    }, [newData]);

    const {
        loading,
        error,
        data: dataTodo,
    } = useQuery(gql`
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
    `);

    loading && console.log(dataTodo?.goals);

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
        // najpierw musze pobrać danę, potem je przefiltrować daty, sprawdzić czy są już dostępne daty
        // i dopiero potem mogę wykonaś mapa po datach i tablicy z resztą todosów
        // return goalsContextAPI.map((goal) => {
        //     // if (todoDate === goal.date)
        //     return (
        //         <div>
        //             <h3>{goal.title}</h3>
        //             <p>{goal.description}</p>
        //         </div>
        //     );
        // });
        console.log(todoUniqueDates);

        return todoUniqueDates.map((todoDate) => {
            console.log(goalsContextAPI);
            return (
                <div>
                    <h2>{todoDate} </h2>

                    {goalsContextAPI.map((goal) => {
                        if (todoDate === goal.date)
                            return (
                                <div>
                                    <h3>{goal.title}</h3>
                                    <p>{goal.description}</p>
                                </div>
                            );
                    })}
                </div>
            );
        });
    };

    const todosQuery = (data: StoreAPIQL) => {
        let uniq = data.goals.filter(
            ({ date }, index, a) =>
                a.findIndex((e) => date === e.date) === index
        );
        // let unique = data.goals.find((uniqueDate): boolean => {
        //     // console.log(uniq);

        //     let newUniqueDate = uniqueDate.date === goalsDate ? true : false;
        //     return newUniqueDate;
        // });
        console.log(uniq);
        return uniq.map(({ date }) => {
            return (
                <div>
                    <h2>{date} </h2>
                    {data.goals.map((goal) => {
                        if (date === goal.date)
                            return (
                                <div>
                                    <h3>{goal.title}</h3>
                                    <p>{goal.description}</p>
                                </div>
                            );
                    })}
                </div>
            );
        });
    };

    const sendQuery = async () => {
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

        console.log(data.goals);

        return setGoalsContextAPI(data.goals);
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
        // const newQuery = sendQuery();

        // const newQueryData = (await newQuery).data.goals;

        // setGoalsContextAPI(newQueryData);
        // setNewData(!newData);

        // console.log(dataSend.data.goal.id);
        // console.log(dataID);
        // console.log(newQueryData);
    };

    console.log(goalsContextAPI);
    console.log("Daty: " + todoUniqueDates);

    if (loading) {
        console.log(loading);

        return <div>Loading...</div>;
    }

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
            {todosQuery(dataTodo)}
            {/* {dataTodo?.goals.map((goal: Product) => (
                <div>{goal.title}</div>
            ))} */}
        </div>
    );

    // return (
    //     <div>
    //         <label htmlFor="todo-title">
    //             <input
    //                 onChange={(e) =>
    //                     setTodoMutation((prev) => ({
    //                         ...prev,
    //                         title: e.target.value,
    //                     }))
    //                 }
    //                 value={todoMutation.title}
    //                 type="text"
    //                 name="todo-title"
    //             />
    //         </label>
    //         <label htmlFor="todo-description">
    //             <textarea
    //                 onChange={(e) =>
    //                     setTodoMutation((prev) => ({
    //                         ...prev,
    //                         description: e.target.value,
    //                     }))
    //                 }
    //                 value={todoMutation.description}
    //                 name="todo-description"
    //             />
    //         </label>
    //         <button onClick={() => addMutation()}>DODAJ CEL</button>

    //         {populateTODO()}
    //     </div>
    // );
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
