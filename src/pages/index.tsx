import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next/types'
import styles from '@/styles/home.module.css'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMainPostRequestAction } from '@/store/actions/postAction'
import { loadMyPostRequestAction } from '@/store/actions/userAction'
import { PostSummary } from '@/types'
import { RootState } from '@/store/reducers'
import { useState } from 'react'

const HomePage: NextPage = () => {
  const dispatch = useDispatch()
  const { mainPosts, loadMainPostLoading } = useSelector((state: RootState) => state.postReducer)
  const { me, myPosts, loadMyPostLoading } = useSelector((state: RootState) => state.userReducer)
  const [ toExposePosts, setToExposePosts ] = useState<PostSummary[]>([])
  
  useEffect(() => {
    dispatch(loadMainPostRequestAction({summary : true, amount : 16}))
  }, [])

  useEffect(() => {
    if(me){
      dispatch(loadMyPostRequestAction({summary : true, amount : 16, writers : [me]}))
    }
  }, [me])

  // useEffect(() => { // infinite scroll
  //   function onScroll() {
  //     if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
  //       const box = document.getElementById('showMineCheckBox') as HTMLInputElement;
  //       if(box && box.checked && !loadMyPostLoading){
  //         dispatch(loadMyPostRequestAction({summary : true, amount : 10, writers : [me]}))
  //       }else if(!loadMainPostLoading){
  //         dispatch(loadMainPostRequestAction({summary : true, amount : 10}))
  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])
    
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
    const box = document.getElementById('showMineCheckBox') as HTMLInputElement;
    if(box && box.checked){
      setToExposePosts(myPosts)
    }else{
      setToExposePosts(mainPosts)
    }
  }, [myPosts, mainPosts])

  const exposeMine = useCallback(()=>{
    const box = document.getElementById('showMineCheckBox') as HTMLInputElement;
    if(box && box.checked){
      setToExposePosts(myPosts)
      console.log('show mine')
    }else{
      setToExposePosts(mainPosts)
      console.log('show all')
    }
  }, [myPosts, mainPosts])

  return (
    <>
      <Head>
        <title>Addit for Football : main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {me?
        (<div className={styles.myPostCheckBox}>
          <input type="checkbox" id="showMineCheckBox" onClick={exposeMine} defaultChecked/>
          My posts
        </div>) : (<></>)
        }
        {(toExposePosts.length === 0)? (<div>No Post</div>) : (
          <div className={styles.postsContainer}>
            {toExposePosts.map((x) => (
              <Link key={x.id} className={styles.postCard} href={`/post/${x.id}`}>
                {x.mainImage ? (
                  <img className={styles.postImage} src={x.mainImage}></img>
                ) : (
                  <div className={styles.postImage} />
                )}
                <div className={styles.postDetails}>
                  <div className={styles.postTitle}>{x.title}</div>
                  <div className={styles.postSnippet}>{x.snippet}</div>
                  <div className={styles.postUploadInfo}>
                    {x.email}
                    <span>{`${timeConverter(x.time)}`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}
          {me?(
        <Link className={styles.write} href={'/write'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
              fill="#fff"
            />
          </svg>
          Write
        </Link>) : (<></>)}
      </main>
    </>
  )
}

export default HomePage
