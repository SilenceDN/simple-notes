
<style>
.resizer {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
    width: 2px;
    margin: 0 -2px;
    border-left: 2px solid rgba(0, 0, 0, 0);
    border-right: 2px solid rgba(0, 0, 0, 0);
    cursor: col-resize;
}
</style>

<template>
    <span
        class="resizer"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    ></span>
</template>

<script>
export default {
    data () {
        return {
            position: 0,
            active: false
        };
    },
    methods: {
        onTouchEnd (e) {
            this.onMouseUp()
        },
        onTouchStart (event) {
            const position = event.touches[0].clientX;
            this.position = position;
            this.active = true;
            this.$emit('drag-start')
        },
        onMouseDown (event) {
            const eventWithTouches = Object.assign({}, event, {
                touches: [{ clientX: event.clientX, clientY: event.clientY }],
            });
            this.onTouchStart(eventWithTouches);
        },
        onMouseUp () {
            this.active = false;
            this.$emit('drag-end')
        },
        onMouseMove (event) {
            const eventWithTouches = Object.assign({}, event, {
                touches: [{ clientX: event.clientX, clientY: event.clientY }],
            });
            this.onTouchMove(eventWithTouches);
        },

        onTouchMove (event) {
            const { active, position } = this;
            if (active) {
                const current = event.touches[0].clientX
                let positionDelta = position - current;
                this.$emit('drag-move', positionDelta)
            }
        }
    },
    mounted () {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
    },
    beforeDestroy () {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onTouchMove);
    }
};
</script>
