import { init as initSentry } from '@sentry/react'
import { create as ackeeCreate } from 'ackee-tracker'

function initTracking() {
    if(process.env.NEXT_PUBLIC_SENTRY_DSN) {
        initSentry({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            tracesSampleRate: 1.0,
            environment: process.env.NEXT_PUBLIC_ENV, 
        })
    }
    
    if(process.env.NEXT_PUBLIC_ACKEE_UUID) {
        ackeeCreate('https://ackee.adridoesthings.com', { detailed: true }).record(process.env.NEXT_PUBLIC_ACKEE_UUID)
    }
    
}

if(typeof window !== 'undefined') {
    initTracking()
}
