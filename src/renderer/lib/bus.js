//全局eventbus

let _events = Object.create({})

function on(event, fn) {
    ;(_events[event] || (_events[event] = [])).push(fn)
}
function once(event, fn) {
    fn.once = true
    on(event, fn)
}
function emit(event, ...args) {
    let cbs = _events[event]
    if (!cbs) return
    cbs = cbs.length > 1 ? copy(cbs) : cbs
    for (let i = 0, l = cbs.length; i < l; i++) {
        let cb = cbs[i]
        cb.call(null, ...args)
        cb.once && off(event, cb)
    }
}
function off(event, fn) {
    if (!arguments.length) _events = Object.create(null)
    let cbs = _events[event]
    if (!cbs) return
    if (!fn) _events[event] = null
    let i = cbs.length,
        cb
    while (i--) {
        cb = cbs[i]
        if (cb == fn) {
            cbs.splice(i, 1)
            break
        }
    }
}
const copy = list => {
    let i = list.length
    const ret = new Array(i)
    while (i--) {
        ret[i] = list[i]
    }
    return ret
}

export { on, emit, once, off }
