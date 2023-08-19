import {ThemeContext, themes} from '@/contexts/ThemeContext';
import React, {FC, ReactNode, useEffect, useState} from 'react';

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {

    const getTheme = () => {
        const theme = `${window?.localStorage?.getItem('theme')}`

        if (Object.values(themes).includes(theme)) return theme

        const userMedia = window.matchMedia('(prefers-color-scheme: light)')
        if (userMedia.matches) return "light"

        return "light"

    }

    const [theme, setTheme] = useState(getTheme)


    const changeTheme = (): string => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light')
        return theme
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])


    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;