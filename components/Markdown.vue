<template>
  <div v-html="content"></div>
</template>
<script>
import Marked from 'marked'
import HighlightJs from 'highlight.js'
export default {
  computed: {
    content () {
      Marked.setOptions({
        gfm: true,
        highlight: function (code) {
          return HighlightJs.highlightAuto(code).value
        }
      })

      return Marked(this.markdown || '')
    }
  },
  props: {
    markdown: String
  },
  head () {
    return {
      link: [
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css'},
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css'}
      ]
    }
  }
}
</script>
