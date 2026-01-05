import React, { createContext, useState, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState("");
    const [showDashboardControls, setShowDashboardControls] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    return (
        <LayoutContext.Provider value={{
            pageTitle,
            setPageTitle,
            showDashboardControls,
            setShowDashboardControls,
            searchValue,
            setSearchValue
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);
