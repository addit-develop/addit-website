import { OutputData } from '@editorjs/editorjs'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import styles from '@/styles/write.module.css'

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
})

const WritePage: NextPage = () => {
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>()
  return (
    <div className={styles.page}>
      <div className={styles.editor}>
        <div className={styles.editor__backgroundImage}>+ 배경 이미지 추가</div>
        <Editor data={data} onChange={setData} holder="editorjs-container" />
      </div>
    </div>
  )
}
export default WritePage
