import Head from 'next/head'
import { NextPage } from 'next/types'
import { parser } from 'editorjs-viewer'
import styles from '@/styles/post.module.css'

// example data from editor.js
const example = {
  title: ' This is sample post!',
  email: 'addit.develop@gmail.com',
  time: 1674897739588,
  blocks: [
    {
      id: '4VO1-bae5v',
      type: 'header',
      data: {
        text: 'Editor.js',
        level: 1,
      },
    },
    {
      id: 'uF5EPBJ50g',
      type: 'paragraph',
      data: {
        text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
      },
    },
  ],
}

const PostPage: NextPage = () => {
  // turn json to html
  const result = parser.toHTML(example.blocks)
  const convertedTime = new Date(example.time)

  return (
    <>
      <Head>
        <title>Addit for Football : post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.page}>
          <div className={styles.postContainer}>
            <div className={styles.title}>{example.title}</div>
            <div className={styles.detail}>{`${
              example.email
            }${'\u00A0\u00A0'}|${'\u00A0\u00A0'}${convertedTime}`}</div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      </main>
    </>
  )
}

export default PostPage
