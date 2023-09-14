import { useCallback, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Events, isDevelopment, lua } from './lib'
import router from './routes/router'

export default function () {
    const [isVisible, setIsVisible] = useState<boolean>(isDevelopment())

    const keydownListener = useCallback((event: KeyboardEvent) => {
        if (event.key !== 'Escape') return

        const hasDialog =
            document.querySelector('[role=alertdialog]') ||
            document.querySelector('[role=dialog]')

        if (hasDialog !== null) return

        lua('close')
    }, [])

    useEffect(() => {
        Events.on('visibility', setIsVisible)

        window.addEventListener('keydown', keydownListener)

        return () => {
            Events.off('visibility', setIsVisible)

            window.removeEventListener('keydown', keydownListener)
        }
    }, [keydownListener])

    if (!isVisible) return <></>

    return (
        <div className="absolute inset-0 z-20 flex w-full items-center justify-center">
            <RouterProvider router={router} />
        </div>
    )
}
