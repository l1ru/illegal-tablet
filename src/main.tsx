import '@/assets/css/global.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TabletContextProvider from './contexts/dealership-context'
import { EventListener, isDevelopment } from './lib'
import './mocks'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TabletContextProvider>
            <div id="app" className={isDevelopment() ? 'bg-[#363636]' : ''}>
                <App />
                <EventListener />
            </div>
        </TabletContextProvider>
    </React.StrictMode>,
)
