import { useContextAPI } from "@/context/createContext";
import React, { useState } from "react";

const GoalsPage = () => {
    const goalsContextAPI = useContextAPI().goals;
    const setGoalsContextAPI = useContextAPI().setGoals;

    console.log(goalsContextAPI);

    return (
        <div>
            <button
                onClick={() => setGoalsContextAPI((prev) => [...prev, "siema"])}
            >
                Kliknij mnie żeby dodać siema
            </button>
            <div>{...goalsContextAPI}</div>
        </div>
    );
};

export default GoalsPage;
