<style>
@import url("./sheet.css");
.code-input {
    margin: 0;
    color: #2c3e50;
    resize: none;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: none;
    font-size: 15px;
    line-height: 1.5;
    background: transparent;
    white-space: pre-wrap;
    word-wrap: break-word;
}
.code-input-focus {
    outline: none;
    background: #fbfbfb;
    border-radius: 6px;
}
.cheat-sheet-wraper {
    height: 100%;
}
.control-bar {
    display: flex;
    justify-content: flex-end;
    padding: 4px 0px;
}
</style>

<template>
    <section class="cheat-sheet-wraper">
        <div class="control-bar">
            <a-button-group>
                <a-button size="small" icon="highlight" type="dashed" @click="controlHandle(true)"></a-button>
                <a-button size="small" icon="eye" type="dashed" @click="controlHandle(false)"></a-button>
            </a-button-group>
        </div>
        <textarea
            v-if="editMode"
            ref="editor"
            :class="{'code-input-focus':editMode}"
            class="code-input"
            v-model="markdown"
        ></textarea>
        <article v-else ref="preview"></article>
    </section>
</template>

<script>
import wrapify from './lib/wrapify'
import { parseHtml } from './lib/dom'
import HyperDown from './lib/hyperdown'
import hljs from 'mavon-editor/dist/highlightjs/highlight.min.js'
import fs from 'fs';
import path from 'path';
import { mapState } from 'vuex';
export default {
    data () {
        return {
            parser: new HyperDown(),
            editMode: false,
            markdown: '',
            html: '',
        }
    },
    computed: {
        ...mapState(['content'])
    },
    watch: {
        content (val) {
            this.markdown = val;
            this.renderMd()
        }
    },
    methods: {
        controlHandle (flag) {
            this.editMode = flag;
            if (!flag) {
                this.renderMd()
            }
        },
        renderMd () {
            let md = `<div>${this.parser.makeHtml(this.markdown)}</div>`
            let parsed = parseHtml(md);
            wrapify(parsed[0])
            this.$nextTick(() => {
                this.$refs.preview.innerHTML = ''
                this.$refs.preview.appendChild(parsed[0]);
                let nodes = document.querySelectorAll('pre code');
                nodes.forEach((block) => {
                    hljs.highlightBlock(block);
                })
            })
        }
    }
}
</script>
