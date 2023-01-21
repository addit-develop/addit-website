import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import LinkTool from '@editorjs/link'
import Timeline from '../plugin/tool'

export const tools = {
  header: {
    class: Header,
    inlineToolbar: ['link'],
  },
  embed: Embed,
  linkTool: LinkTool,
  timeline: Timeline,
}
