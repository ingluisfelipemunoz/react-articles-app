import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { ThemeProvider } from "./ThemeProvider";


export function AppProviders({children}: PropsWithChildren) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider />
                {children}
            </QueryClientProvider>
        </Provider>
    );
}