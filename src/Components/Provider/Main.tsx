'use client'

import CategoryCourseProvider from "./CategoryCourseProvider";



export const Main = ({ children }: { children: React.ReactNode }) => {


    return (

        <CategoryCourseProvider>
            {children}
        </CategoryCourseProvider>
    )
};

