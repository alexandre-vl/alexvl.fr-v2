"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useSyncExternalStore,
    type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => { },
});

function isTheme(value: string | null): value is Theme {
    return value === "dark" || value === "light";
}

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getThemeSnapshot(): Theme {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(saved) ? saved : getSystemTheme();
}

function subscribeToThemeChanges(onStoreChange: () => void) {
    if (typeof window === "undefined") return () => { };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleStorage = (event: StorageEvent) => {
        if (event.key === THEME_STORAGE_KEY) onStoreChange();
    };

    media.addEventListener("change", onStoreChange);
    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

    return () => {
        media.removeEventListener("change", onStoreChange);
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    };
}

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useSyncExternalStore<Theme>(
        subscribeToThemeChanges,
        getThemeSnapshot,
        () => "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
