import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {

    const [state, setState] = useState<T>(() => {
        const savedState = localStorage.getItem(key);
        return savedState ? JSON.parse(savedState) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state])


    return [state, setState];
}