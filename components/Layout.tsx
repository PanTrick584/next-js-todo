import React, { Children, ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Main } from "./Main";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navigation />
            <Main>{children}</Main>
        </>
    );
};
