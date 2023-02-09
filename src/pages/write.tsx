import { OutputData } from '@editorjs/editorjs'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import loadable from '@loadable/component'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import styles from '@/styles/write.module.css'
import { Comment, Post, PostSummary } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import { editPostRequestAction, savePostRequestAction } from '@/store/actions/postAction'
import { useRouter } from 'next/router'
import { loginRequestAction, logoutRequestAction } from '@/store/actions/userAction'
import wrapper from '@/store/configureStore'
import backAxios from '@/store/configureBackAxios'
import { LOAD_USER_REQUEST } from '@/store/types'
import { END } from 'redux-saga'

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const Editor = loadable(() => import('../components/editor/editor'), { ssr: false })

const WritePage: NextPage = () => {
  const { me } = useSelector((state: RootState) => state.userReducer)
  const { savePostSuccess, savePostLoading, savedPostId, exPost } = useSelector((state: RootState) => state.postReducer)
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>(
    exPost
      ? exPost.data
      : {
          time: 0,
          blocks: [],
          version: '2.26.4',
        }
  )
  
  const saveTitle = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    setTitle(e.currentTarget.textContent || exPost.title || '')
  }, [])

  const [title, setTitle] = useState<string>(exPost?exPost.title:'')
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // redirect to main if not logged in or other post is yet saving.
    async function redirectToLoginPageOrResetReducer() {
      const loginUrl = await loginRequestAction()
      if (loginUrl) {
        router.replace(loginUrl)
      }
    }
    if(exPost && me && me!==exPost.email){
      dispatch(logoutRequestAction())
    } else if (!me) {
      redirectToLoginPageOrResetReducer()
    }
  }, [me])

  const savePost = useCallback(() => {
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
        } else if (block.type === 'image' && !mainImage && block.data.file.url) {
          const splitedImageUrl = block.data.file.url.split('/')
          const fileName = splitedImageUrl[splitedImageUrl.length - 1]
          mainImage = 'https://addit-football-s3.s3.ap-northeast-2.amazonaws.com/thumb/' + fileName
        }
      }
      const post: Post = {
        id: exPost ? exPost.id : 0,
        title: title,
        hashtags: hashtags,
        email: me,
        data: data,
        snippet: snippet || '',
        comments: exPost ? exPost.comments : [],
        likes: exPost ? exPost.likes : 0,
        views: exPost ? exPost.views : 0,
        mainImage: mainImage,
      }
      dispatch(savePostRequestAction(post))
    }
  }, [data, title, me])

  useEffect(() => {
    if (!savePostLoading && savePostSuccess && savedPostId) {
      const id = savedPostId
      router.replace(`/post/${id}`)
    }
  }, [savePostLoading, savePostSuccess, savedPostId])

  const preventEnter = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }, [])

  return (
    <div className={styles.page}>
      {/* <div className={styles.editor__backgroundImage}>+ Add background image</div> */}
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    backAxios.defaults.headers.Cookie = ''
    if (context.req && cookie) backAxios.defaults.headers.Cookie = cookie
    store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    const id:number = context.query.postId ? Number(context.query.postId):0;
    if(id){store.dispatch(editPostRequestAction({ids:[id]}))}
    store.dispatch(END)
    await store.sagaTask?.toPromise()

    const meSsr:string = store.getState().userReducer.me
    const exPostSsr:Post = store.getState().postReducer.exPost
    if(exPostSsr && exPostSsr.email !== meSsr){
      return {
        redirect: {
          permanent: true,
          destination: "/",
        },
      }
    }
    return { props: {exPostSsr:exPostSsr} }
  }
)

export default WritePage
