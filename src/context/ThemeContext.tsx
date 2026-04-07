import {createContext, useState} from "react";
import type { ReactNode } from "react";

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

const ThemeProvider = ({ children }: { children: ReactNode }) => {


    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}



export { ThemeProvider, ThemeContext };