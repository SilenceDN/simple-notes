import { app, BrowserWindow, ipcMain } from 'electron'
import openAboutWindow from 'about-window'
import path from 'path'
const join = path.join
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
        height: 630,
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
let bootChecked = false
let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
}
app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
autoUpdater.on('error', function(error) {
    sendUpdateMessage(message.error)
})
autoUpdater.on('checking-for-update', function() {
    if (!bootChecked) return
    sendUpdateMessage(message.checking)
})
autoUpdater.on('update-available', function(info) {
    if (!bootChecked) {
        mainWindow.webContents.send('update-available')
        bootChecked = true
        return
    }
    sendUpdateMessage(message.updateAva)
})
autoUpdater.on('update-not-available', function(info) {
    if (!bootChecked) {
        bootChecked = true
        return
    }
    sendUpdateMessage(message.updateNotAva)
})

// 更新下载进度事件
autoUpdater.on('download-progress', function(progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
})
autoUpdater.on('update-downloaded', function(info) {
    ipcMain.on('isUpdateNow', (e, arg) => {
        console.log(arguments)
        console.log('开始更新')
        //some code here to handle event
        autoUpdater.quitAndInstall()
    })

    mainWindow.webContents.send('isUpdateNow')
})

ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates()
})
ipcMain.on('about', () => {
    openAboutWindow({
        product_name: 'SimpleNotes',
        use_version_info: false,
        icon_path: join(__static, 'icon.png'),
        copyright: 'Copyright (c) 2019 citizenl',
        package_json_dir: join('../../', __dirname),
        description: 'Q ❤️ W',
        open_devtools: process.env.NODE_ENV !== 'production',
        win_options: {
            maximizable: false,
            title: 'About SimpleNotes',
            width: 300
        }
    })
})
ipcMain.on('exit', () => {
    app.quit()
})

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
    console.log(text)
    mainWindow.webContents.send('update-message', text)
}
