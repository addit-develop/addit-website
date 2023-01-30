import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next/types'
import styles from '@/styles/home.module.css'
import { useMemo } from 'react'

interface PostData {
  id: number
  title: string
  email: string
  snippet: string
  time: number | string
  image: string
}

// example posts data
const example: PostData[] = [
  {
    id: 1,
    title: ' This is sample post!',
    email: 'addit.develop@gmail.com',
    snippet: 'Learn about hosting built for scale and reliability.',
    time: 1674897739588,
    image: '',
  },
  {
    id: 2,
    title: ' This is sample post!',
    email: 'addit.develop@gmail.com',
    snippet: 'Learn about hosting built for scale and reliability.',
    time: 1674897739588,
    image: '',
  },
  {
    id: 3,
    title: ' This is sample post!',
    email: 'addit.develop@gmail.com',
    snippet: 'Learn about hosting built for scale and reliability.',
    time: 1674897739588,
    image: '',
  },
  {
    id: 4,
    title: ' This is sample post!',
    email: 'addit.develop@gmail.com',
    snippet: 'Learn about hosting built for scale and reliability.',
    time: 1674897739588,
    image: '',
  },
  {
    id: 5,
    title: ' This is sample post!',
    email: 'addit.develop@gmail.com',
    snippet: 'Learn about hosting built for scale and reliability.',
    time: 1674897739588,
    image: '',
  },
]

const HomePage: NextPage = () => {
  useMemo(() => {
    example.forEach((x) => {
      const covertedTime = new Date(x.time).toString().split(' ')
      x.time = `${covertedTime[1]} ${covertedTime[2]} ${covertedTime[3]}`
    })
    console.log(example)
  }, [example])

  return (
    <>
      <Head>
        <title>Addit for Football : main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.myPostCheckBox}>
          <input type="checkbox" />
          My posts
        </div>
        <div className={styles.postsContainer}>
          {example.map((x) => (
            <Link key={x.id} className={styles.postCard} href={`/post/${x.id}`}>
              {example[0].image !== '' ? (
                <img className={styles.postImage}></img>
              ) : (
                <div className={styles.postImage} />
              )}
              <div className={styles.postDetails}>
                <div className={styles.postTitle}>{example[0].title}</div>
                <div className={styles.postSnippet}>{example[0].snippet}</div>
                <div className={styles.postUploadInfo}>
                  {example[0].email}
                  <span>{`${example[0].time}`}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link className={styles.write} href={'/write'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
              fill="#fff"
            />
          </svg>
          Write
        </Link>
      </main>
    </>
  )
}

export default HomePage
