import { createContext, useContext, useState } from 'react'

interface ContextData {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const DealershipContext = createContext({} as ContextData)

export default function DealershipContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [darkMode, setDarkMode] = useState<boolean>(true)

    return (
        <DealershipContext.Provider value={{ darkMode, setDarkMode }}>
            <div className={darkMode ? 'dark' : ''}>{children}</div>
        </DealershipContext.Provider>
    )
}

export const useDealership = () => useContext(DealershipContext)
