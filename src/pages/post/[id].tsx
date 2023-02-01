import Head from 'next/head'
import { NextPage } from 'next/types'
import { parser } from 'editorjs-viewer'
import styles from '@/styles/post.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostRequestAction } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import { useState } from 'react'

const PostPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const { post, loadPostSuccess } = useSelector((state: RootState) => state.postReducer)
  const [ result, setResult ] = useState<string>('<></>')

  function timeConverter(UNIX_timestamp : number){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = '00'+a.getHours();
    var min = '00'+a.getMinutes();
    var sec = '00'+a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour.slice(-2) + ':' + min.slice(-2) + ':' + sec.slice(-2) ;
    return time;
  }

  useEffect(() => {
    if(id){
      dispatch(loadPostRequestAction({ids:[id], amount:1}))
    }
  }, [id])

  const conf = {

    // naming must be in lower case and can not be combined
    image : {
        onReturn(value : any){
            // value.data.file.url is the value from editor js image look at here https://github.com/editor-js/image
            // if you want to use another tag such as link, iframe or etc then follow their return rules
            return `<img src='${value.data.file.url}'/>`
        }
    },
    // you can add more e.g iframe, code, raw and etc
}

  useEffect(() => {
    if(post){
      setResult(parser.toHTML(post.data.blocks, conf))
    }
  }, [post])
  // turn json to html

  return (
    <>
      <Head>
        <title>Addit for Football : post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.page}>
        {post? (
          <div className={styles.postContainer}>
              <div className={styles.title}>{post.title}</div>
              <div className={styles.detail}>{`${
                post.email
              }${'\u00A0\u00A0'}|${'\u00A0\u00A0'}${timeConverter(post.data.time || 0)}`}</div>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: result }} />
          </div>) : (<div>This post does not exist or has been deleted.</div>)}
        </div>
      </main>
    </>
  )
}

export default PostPage
