<style lang="less">
.title-bar {
    height: 30px;
    background: #fff;
    -webkit-app-region: drag;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    z-index: 10000;
    span {
        line-height: 30px;
        margin-left: 6px;
    }
}
.controls {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: auto;
}
.controls button {
    outline: none;
    -webkit-app-region: no-drag;
    display: inline-block;
    position: relative;
    width: 45px;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    border: none;
    box-shadow: none;
    border-radius: 0;
    color: #000;
    background-color: transparent;
    transition: background-color 0.25s ease;
    line-height: 10px;

    &:hover {
        background-color: #eee;
    }

    svg {
        fill: currentColor;
    }
}
</style>

<template>
    <div class="title-bar">
        <span>{{title}}</span>
        <div class="controls">
            <button
                @click="item.handle"
                class="window-control"
                :class="item.name"
                v-for="item in btns"
                :key="item.name"
            >
                <svg aria-hidden="true" version="1.1" width="10" height="10">
                    <path :d="item.path"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>
const closePath =
    'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z'
const restorePath =
    'm 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z'
const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z'
const minimizePath = 'M 0,5 10,5 10,6 0,6 Z'
import { mapState } from 'vuex';
export default {
    data () {
        return {
            title: 'Simple-Notes',
            windowState: '',
            $window: null,

        }
    },
    watch: {
        userName (val) {
            this.title = `${val.toLocaleUpperCase()} | Made with ❤️`
        }
    },
    computed: {
        ...mapState(['userName']),
        btns () {
            if (process.platform === 'win32') {
                let min = { name: 'minimize', handle: this.onMinimize, path: minimizePath };
                let maximizeOrRestore = this.windowState == 'maximized' ? { name: 'restore', handle: this.onRestore, path: restorePath } : { name: 'maximize', handle: this.onMaximize, path: maximizePath }
                let close = { name: 'close', handle: this.onClose, path: closePath };
                return [
                    min, maximizeOrRestore, close
                ]
            } else {
                return []
            }
        }
    },
    methods: {
        onMinimize () {
            this.$window.minimize()
        },
        onMaximize () {
            this.$window.maximize()
        },
        onRestore () {
            this.$window.unmaximize()
        },
        onClose () {
            this.$window.close()
        },
        onWindowStateChanged (event, args) {
            this.windowState = args
        }
    },
    created () {
        this.$window = this.$electron.remote.getCurrentWindow()
    },
    beforeMount () {
        let ipc = this.$electron.ipcRenderer;
        ipc.on('window-state-changed', this.onWindowStateChanged.bind(this));
        this.windowState = getWindowState(this.$window)
    },
    beforeDestroy () {
        let ipc = this.$electron.ipcRenderer;
        ipc.removeListener(
            'window-state-changed',
            this.onWindowStateChanged
        )
    }
}

function getWindowState (window) {
    if (window.isFullScreen()) {
        return 'full-screen'
    } else if (window.isMaximized()) {
        return 'maximized'
    } else if (window.isMinimized()) {
        return 'minimized'
    } else if (!window.isVisible()) {
        return 'hidden'
    } else {
        return 'normal'
    }
}
</script>

