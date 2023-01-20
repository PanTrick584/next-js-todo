import React, { useContext } from "react";

const TodoPage = () => {
    // let todoContext = useContext()

    const currentDate = new Date();
    const day = currentDate.getDay();

    let currentDay =
        day === 0
            ? "Poniedziałek"
            : day === 1
            ? "Wtorek"
            : day === 3
            ? "Środa"
            : day === 4
            ? "Czwartek"
            : day === 5
            ? "Piątek"
            : day === 6
            ? "Sobota"
            : day === 7
            ? "Niedziela"
            : "Ósmek";

    return <div>{currentDay}</div>;
};

export default TodoPage;
