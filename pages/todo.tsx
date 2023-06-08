import { useContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import { summaryDate } from "@/utils/const";
import { gql, useQuery } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState, ReactNode } from "react";
import styles from "../styles/Home.module.css";

interface newTodoMutation {
    title: string;
    description: string;
    date: string;
}

export default function ProductsPage() {
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

    useEffect(() => {}, []);

    useEffect(() => {
        // todosQuery(dataTodo);
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

        return todoUniqueDates.map((todoDate, id) => {
            console.log(goalsContextAPI);
            return (
                <div key={"todo-"+id}>
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

    const deleteTODO = (id: string) => {
        console.log(id);
        console.log("delete this todo");
    };

    const todosQuery = (data: StoreAPIQL) => {
        let uniq = data.goals.filter(
            ({ date }, index, a) =>
                a.findIndex((e) => date === e.date) === index
        );

        return uniq.map(({ date, id }) => {
            return (
                <div className={styles.date} key={id} id={`date-${id}`}>
                    <h2 className={styles.dateHeader}>{date} </h2>
                    {data.goals.map(
                        ({ title, description, id: gID, date: gDate }) => {
                            if (date === gDate)
                                return (
                                    <div key={"uniq-" + id + gID} className={styles.todo}>
                                        <div className={styles.todoBox}>
                                            <h3
                                                className={styles.todoBoxHeader}
                                            >
                                                {title}
                                            </h3>
                                            <button
                                                className={styles.todoButton}
                                                onClick={() => deleteTODO(gID)}
                                            >
                                                DONE
                                            </button>
                                        </div>
                                        <p className={styles.todoDescription}>
                                            {description}
                                        </p>
                                    </div>
                                );
                        }
                    )}
                </div>
            );
        });
    };

    const addMutation = async () => {
        const dataSend = await endpoint.mutate({
            mutation: MUTATION_SEND,
            variables: {
                goal: todoMutation,
            },
        });

        await endpoint.mutate({
            mutation: MUTATION_PUBLISH,
            variables: {
                where: { id: dataSend.data.goal.id },
                to: ["PUBLISHED"],
            },
        });

        setNewData(true);
    };

    console.log(dataTodo);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Coś zepsułem...:/</div>;

    return (
        <div>
            <div className={styles.todoForm}>
                <label htmlFor="todo-title">
                    <input
                        className={styles.todoFormInput}
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
                        className={styles.todoFormDescription}
                        onChange={(e) =>
                            setTodoMutation((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        value={todoMutation.description}
                        name="todo-description"
                        style={{ width: "100%" }}
                    />
                </label>
                <button
                    className={styles.todoFormButton}
                    onClick={() => addMutation()}
                >
                    DODAJ CEL
                </button>
            </div>
            {todosQuery(dataTodo)}
        </div>
    );
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
