import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import LinkTool from '@editorjs/link'
import footballTool from '../plugin/footballTool'

export const tools = {
  header: {
    class: Header,
    inlineToolbar: ['link'],
  },
  embed: Embed,
  linkTool: LinkTool,
  footballTool: footballTool,
}
