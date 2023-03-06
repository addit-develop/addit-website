import { SHADOWS } from '@/constants/constants'
import styled from 'styled-components'

const ShareModal = styled.div`
  position: absolute;
  right: 0px;
  top: 40px;
  padding: 8px;
  border-radius: 10px;
  box-shadow: ${SHADOWS.default};
  z-index: 100;
  background-color: white;
`
const ShareButton = styled.button`
  width: 48px;
  height: 30px;
`

interface Props {
  onClickShareUrl: () => void
  onClickShareContent: () => void
}
const PostShareModal = ({ onClickShareUrl, onClickShareContent }: Props) => {
  return (
    <ShareModal>
      <ShareButton onClick={onClickShareUrl}>URL</ShareButton>
      <ShareButton onClick={onClickShareContent}>본문</ShareButton>
    </ShareModal>
  )
}

export default PostShareModal
