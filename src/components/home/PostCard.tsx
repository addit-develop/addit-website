import { COLORS, SHADOWS } from '@/constants/constants'
import useTimeConverter from '@/hooks/useTimeConverter'
import { PostSummaryType } from '@/types'
import Link from 'next/link'
import styled from 'styled-components'

const PostBox = styled.div`
  width: 100%;
  aspect-ratio: 273/380;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope';
  overflow: hidden;
  border-radius: 20px;
  box-shadow: ${SHADOWS.default};
  @media only screen and (max-width: 500px) {
    aspect-ratio: auto;
    height: fit-content;
  }
`

const PostImage = styled.div<{ noImage?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.lightgray};
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(props) =>
    props.noImage &&
    `@media only screen and (max-width: 500px) {
    display: none;
  }`};
`

const PostDetails = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: fit-content;
  min-height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
`

const PostTitle = styled.div`
  display: -webkit-box;
  flex-shrink: 0;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const PostSnippet = styled.div`
  height: 100%;
  font-size: 15px;
  color: ${COLORS.lightblack};
`

const PostUploadInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const PostTime = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${COLORS.lightblack};
`

interface Props {
  post: PostSummaryType
}

const PostCard = ({ post }: Props) => {
  const { UNIXtimeConverter } = useTimeConverter()

  return (
    <PostBox>
      {post.mainImage ? (
        <PostImage>
          <Link href={`/post/${post.id}`}>
            <img src={post.mainImage} alt={post.title} />
          </Link>
        </PostImage>
      ) : (
        <PostImage noImage>
          <Link href={`/post/${post.id}`}>
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt={post.title}
            />
          </Link>
        </PostImage>
      )}
      <PostDetails>
        <Link href={`/post/${post.id}`}>
          <PostTitle>{post.title}</PostTitle>
          <PostSnippet>{post.snippet.replace(/&nbsp;/g, ' ')}</PostSnippet>
        </Link>
        <PostUploadInfo>
          <Link href={`/blog/${post.email}`}>{post.email}</Link>
          <PostTime>{`${UNIXtimeConverter(post.time)}`}</PostTime>
        </PostUploadInfo>
      </PostDetails>
    </PostBox>
  )
}

export default PostCard
