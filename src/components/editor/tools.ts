import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import LinkTool from '@editorjs/link'
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import footballTool from '../plugin/footballTool'

export const tools = {
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: 'write something',
    },
  },
  header: {
    class: Header,
    inlineToolbar: ['link'],
  },
  footballTool: footballTool,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        facebook: true,
        instagram: true,
        twitter: true,
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: 'http://localhost:3065/post/image/byFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:3065/post/image/byUrl', // Your endpoint that provides uploading by Url
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  linkTool: LinkTool,
}
