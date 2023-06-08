export const getDay = (day: number): string => {
    return day === 1
        ? "Poniedziałek"
        : day === 2
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
};

export const getMonth = (month: number): string => {
    return month === 0
        ? "Stycznia"
        : month === 1
        ? "Lutego"
        : month === 2
        ? "Marca"
        : month === 3
        ? "Kwietnia"
        : month === 4
        ? "Maja"
        : month === 5
        ? "Czerwca"
        : month === 6
        ? "Lipca"
        : month === 7
        ? "Sierpnia"
        : month === 8
        ? "Września"
        : month === 9
        ? "Października"
        : month === 10
        ? "Listopada"
        : month === 11
        ? "Grudnia"
        : "Month undefined";
};

export const summaryDate = (): string => {
    const date = new Date();
    const day = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currentDay = getDay(day);
    const currentMonth = getMonth(month);

    const summaryDate = `${currentDay} /\n ${dayOfMonth} ${currentMonth} /\n ${year}`;

    return summaryDate;
};
