import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'regenbogenICEThemeColor'
export const DEFAULT_COLOR = '#FF007A'

export function useThemeColor() {
    const [themeColor, setThemeColor] = useState(DEFAULT_COLOR)
    const [transitionThemeColor, setTransitionThemeColor] = useState(false)

    useEffect(() => {
        const storedThemeColor = window.localStorage.getItem(THEME_STORAGE_KEY)
        
        if(storedThemeColor) {
            setTransitionThemeColor(false)
            setThemeColor(storedThemeColor)
        }
    }, [])

    function changeThemeColor(newThemeColor: string) {
        setTransitionThemeColor(true)
        setThemeColor(newThemeColor)

        window.localStorage.setItem(THEME_STORAGE_KEY, newThemeColor)
    }

    return [themeColor, transitionThemeColor, changeThemeColor]
}
