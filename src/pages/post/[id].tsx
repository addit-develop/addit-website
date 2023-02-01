import Head from 'next/head'
import { NextPage } from 'next/types'
import { parser } from 'editorjs-viewer'
import styles from '@/styles/post.module.css'
import { useRouter } from 'next/router'
import FixtureListByLeague from '../../components/block/fixtureListByLeague'
import { renderToString } from 'react-dom/server'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { OutputData } from '@editorjs/editorjs'

const Editor = dynamic(() => import('../../components/editor/editor'), {
  ssr: false,
})

// example data from editor.js
const example = {
  title: ' This is sample post!',
  email: 'addit.develop@gmail.com',
  time: 1674897739588,
  version: '2.26.4',
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
    {
      id: 'R41DyfeY12',
      type: 'footballTool',
      data: {
        type: 'Fixture_List_By_Date',
        data: [
          {
            id: 45,
            name: 'FA Cup',
            logo: 'https://media.api-sports.io/football/leagues/45.png',
            fixtures: [
              {
                fixture: {
                  id: 997627,
                  referee: null,
                  timezone: 'Asia/Seoul',
                  date: '2023-02-01T04:45:00+09:00',
                  timestamp: 1675194300,
                  periods: {
                    first: 1675194300,
                    second: 1675197900,
                  },
                  venue: {
                    id: 12596,
                    name: "St Andrew's Stadium",
                    city: 'Birmingham',
                  },
                  status: {
                    long: 'Match Finished',
                    short: 'AET',
                    elapsed: 120,
                  },
                },
                league: {
                  id: 45,
                  name: 'FA Cup',
                  country: 'England',
                  logo: 'https://media.api-sports.io/football/leagues/45.png',
                  flag: 'https://media.api-sports.io/flags/gb.svg',
                  season: 2022,
                  round: '4th Round Replays',
                },
                teams: {
                  home: {
                    id: 54,
                    name: 'Birmingham',
                    logo: 'https://media.api-sports.io/football/teams/54.png',
                    winner: false,
                  },
                  away: {
                    id: 67,
                    name: 'Blackburn',
                    logo: 'https://media.api-sports.io/football/teams/67.png',
                    winner: true,
                  },
                },
                goals: {
                  home: 0,
                  away: 1,
                },
                score: {
                  halftime: {
                    home: 0,
                    away: 0,
                  },
                  fulltime: {
                    home: 0,
                    away: 0,
                  },
                  extratime: {
                    home: 0,
                    away: 1,
                  },
                  penalty: {
                    home: null,
                    away: null,
                  },
                },
              },
            ],
          },
          {
            id: 48,
            name: 'League Cup',
            logo: 'https://media.api-sports.io/football/leagues/48.png',
            fixtures: [
              {
                fixture: {
                  id: 986794,
                  referee: 'Paul Tierney, England',
                  timezone: 'Asia/Seoul',
                  date: '2023-02-01T05:00:00+09:00',
                  timestamp: 1675195200,
                  periods: {
                    first: 1675195200,
                    second: 1675198800,
                  },
                  venue: {
                    id: 562,
                    name: "St. James' Park",
                    city: 'Newcastle upon Tyne',
                  },
                  status: {
                    long: 'Match Finished',
                    short: 'FT',
                    elapsed: 90,
                  },
                },
                league: {
                  id: 48,
                  name: 'League Cup',
                  country: 'England',
                  logo: 'https://media.api-sports.io/football/leagues/48.png',
                  flag: 'https://media.api-sports.io/flags/gb.svg',
                  season: 2022,
                  round: 'Semi-finals',
                },
                teams: {
                  home: {
                    id: 34,
                    name: 'Newcastle',
                    logo: 'https://media-3.api-sports.io/football/teams/34.png',
                    winner: true,
                  },
                  away: {
                    id: 41,
                    name: 'Southampton',
                    logo: 'https://media-3.api-sports.io/football/teams/41.png',
                    winner: false,
                  },
                },
                goals: {
                  home: 2,
                  away: 1,
                },
                score: {
                  halftime: {
                    home: 2,
                    away: 1,
                  },
                  fulltime: {
                    home: 2,
                    away: 1,
                  },
                  extratime: {
                    home: null,
                    away: null,
                  },
                  penalty: {
                    home: null,
                    away: null,
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
}

const conf = {
  footballTool: {
    onReturn(value: any) {
      return `<div className='footballTool' id=${value.id} />`
    },
  },
}

const PostPage: NextPage = () => {
  const [data, setData] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: '2.26.4',
  })
  const router = useRouter()
  const { id } = router.query
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
            <Editor
              data={{ time: example.time, version: example.version, blocks: example.blocks }}
              onChange={setData}
              holder="editorjs-container"
              readonly={true}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default PostPage
