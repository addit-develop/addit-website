import { OutputData } from '@editorjs/editorjs'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import styles from '@/styles/write.module.css'

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const Editor = dynamic(() => import('../components/editor/editor'), {
  ssr: false,
})

const WritePage: NextPage = () => {
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>()
  const [title, setTitle] = useState<string | null>()

  const savePost = useCallback(() => {
    const saveData = {
      title: title,
      ...data,
    }
    console.log(saveData)
  }, [data, title])

  const preventEnter = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }, [])

  const saveTitle = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    setTitle(e.currentTarget.textContent)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.editor__backgroundImage}>+ Add background image</div>
      <div className={styles.editor}>
        <div className={styles.title}>
          <div
            id="titleInput"
            contentEditable
            onKeyDown={(e) => preventEnter(e)}
            onInput={(e) => saveTitle(e)}
          />
        </div>
        <Editor data={data} onChange={setData} holder="editorjs-container" />
        <button className={styles.publish} onClick={savePost}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
              fill="#fff"
            />
          </svg>
          Publish
        </button>
      </div>
    </div>
  )
}

export default WritePage
