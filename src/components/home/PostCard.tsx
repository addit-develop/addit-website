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
`

const PostImage = styled.div`
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
`

const PostDetails = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 175px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

const PostTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`

const PostSnippet = styled.div`
  flex: 1;
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
    <Link href={`/post/${post.id}`}>
      <PostBox>
        {post.mainImage && (
          <PostImage>
            <img src={post.mainImage} alt={post.title} />
          </PostImage>
        )}
        <PostDetails>
          <PostTitle>{post.title}</PostTitle>
          <PostSnippet>{post.snippet}</PostSnippet>
          <PostUploadInfo>
            {post.email}
            <PostTime>{`${UNIXtimeConverter(post.time)}`}</PostTime>
          </PostUploadInfo>
        </PostDetails>
      </PostBox>
    </Link>
  )
}

export default PostCard
