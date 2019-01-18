import { app, BrowserWindow } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 610,
        useContentSize: true,
        width: 1000,
        titleBarStyle: 'hidden',
        frame: false
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
    registerWindowStateChangedEvents(mainWindow)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

function registerWindowStateChangedEvents(window) {
    window.on('enter-full-screen', () =>
        sendWindowStateEvent(window, 'full-screen')
    )
    // So this is a bit of a hack. If we call window.isFullScreen directly after
    // receiving the leave-full-screen event it'll return true which isn't what
    // we're after. So we'll say that we're transitioning to 'normal' even though
    // we might be maximized. This works because electron will emit a 'maximized'
    // event after 'leave-full-screen' if the state prior to full-screen was maximized.
    window.on('leave-full-screen', () => sendWindowStateEvent(window, 'normal'))

    window.on('maximize', () => sendWindowStateEvent(window, 'maximized'))
    window.on('minimize', () => sendWindowStateEvent(window, 'minimized'))
    window.on('unmaximize', () => sendWindowStateEvent(window, 'normal'))
    window.on('restore', () => sendWindowStateEvent(window, 'normal'))
    window.on('hide', () => sendWindowStateEvent(window, 'hidden'))
    window.on('show', () => sendWindowStateEvent(window, 'normal'))
}

/**
 * Short hand convenience function for sending a window state change event
 * over the window-state-changed channel to the render process.
 */
function sendWindowStateEvent(window, state) {
    window.webContents.send('window-state-changed', state)
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
