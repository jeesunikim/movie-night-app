/* tslint:disable no-empty */
import React from "react";

const SearchContext = React.createContext({
    handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {},
    handleUpdateSearch(event: React.ChangeEvent<HTMLSelectElement>) {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
