import { OutputData } from '@editorjs/editorjs'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import styles from '@/styles/write.module.css'
import { Comment, Post } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import { savePostRequestAction } from '@/store/actions/postAction'
import { useRouter } from 'next/router'

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const Editor = dynamic(() => import('../components/editor/editor'), {
  ssr: false,
})

const WritePage: NextPage = () => {
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: '2.26.4',
  })
  const [title, setTitle] = useState<string>('')
  const { me } = useSelector((state: RootState) => state.userReducer)
  const { savePostSuccess, savePostLoading, currentPost } = useSelector(
    (state: RootState) => state.postReducer
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // redirect to main if not logged in or other post is yet saving.
    // if(!me || savePostLoading ){
    //   router.replace('/')
    // }
  }, [me])

  const savePost = useCallback(() => {
    console.log(data)
    if (me) {
      const hashtagRegex = /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g
      var hashtags: string[] = (title.match(hashtagRegex) || []).map((e) =>
        e.slice(1).toLowerCase()
      )
      var snippet: string | null = null

      var mainImage: string | null = null
      for (const index in data.blocks) {
        const block = data.blocks[index]
        if (block.type === 'paragraph') {
          if (!snippet) {
            if (block.data.text.length > 50) {
              snippet = block.data.text.substr(0, 50) + '...'
            } else {
              snippet = block.data.text
            }
          }
          hashtags = hashtags.concat(
            (block.data.text.match(hashtagRegex) || []).map((e: string) => e.slice(1).toLowerCase())
          )
        } else if (block.type === 'image' && !mainImage) {
          console.log(block.data)
          mainImage = block.data.file.url
        }
      }
      const post: Post = {
        id: 0,
        title: title,
        hashtags: hashtags,
        email: me,
        data: data,
        snippet: snippet || '',
        comments: [],
        likes: 0,
        views: 0,
        mainImage: mainImage,
      }
      dispatch(savePostRequestAction(post))
    }
  }, [data, title, me])

  useEffect(() => {
    // redirect after save
    if (savePostSuccess && currentPost) {
      router.replace(`/post/${currentPost.id}`)
    }
  }, [savePostLoading])

  const preventEnter = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }, [])

  const saveTitle = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    setTitle(e.currentTarget.textContent || '')
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
        <Editor data={data} onChange={setData} holder="editorjs-container" readonly={false} />
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
