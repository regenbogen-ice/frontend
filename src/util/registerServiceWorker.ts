setTimeout(() => {
    if(typeof navigator !== 'undefined' 
        && navigator.serviceWorker
        && window.location.hostname !== 'localhost'
        && window.location.hostname !== '127.0.0.1') {
        navigator.serviceWorker.register('/sw.js')
    }
}, 1000)

export {}
