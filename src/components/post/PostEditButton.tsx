import { PenIcon, TrashBinIcon } from '@/assets/icons'
import { COLORS, SHADOWS } from '@/constants/constants'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  z-index: 100;
`
const EditButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: calc(50% - 108px);
  width: 160px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 10;
  font-family: 'Manrope';
  font-size: 18px;
  color: ${COLORS.white};
  font-weight: 800;
  box-shadow: ${SHADOWS.default};
  background-color: var(--blue);
  border-radius: 30px;
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: calc(50% + 64px);
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Manrope';
  font-size: 18px;
  color: var(--white);
  font-weight: 800;
  box-shadow: 0px 0.8px 2.4px -0.63px rgba(15, 41, 107, 0.1),
    0px 2.4px 7.24px -1.3px rgba(15, 41, 107, 0.1), 0px 6.4px 19.1px -1.9px rgba(15, 41, 107, 0.1),
    0px 20px 60px -2.5px rgba(15, 41, 107, 0.1);
  background-color: #d94343;
  border-radius: 30px;
`
interface Props {
  editPost: () => void
  deletePost: () => void
}

const PostEditButton = ({ editPost, deletePost }: Props) => {
  return (
    <ButtonContainer>
      <EditButton onClick={editPost}>
        <PenIcon width={24} height={24} fill={COLORS.white} />
        Edit
      </EditButton>
      <DeleteButton onClick={deletePost}>
        <TrashBinIcon width={24} height={24} fill={COLORS.white} />
      </DeleteButton>
    </ButtonContainer>
  )
}

export default PostEditButton
