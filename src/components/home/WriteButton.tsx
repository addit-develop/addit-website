import { PenIcon } from '@/assets/icons'
import Link from 'next/link'
import styled from 'styled-components'

const Button = styled.div`
  z-index: 9;
  position: absolute;
  bottom: 24px;
  left: calc(50% - 80px);
  width: 160px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 15px 15px;
  gap: 10px;
  font-family: 'Manrope';
  font-size: 18px;
  color: var(--white);
  font-weight: 800;
  box-shadow: 0px 0.8px 2.4px -0.63px rgba(15, 41, 107, 0.1),
    0px 2.4px 7.24px -1.3px rgba(15, 41, 107, 0.1), 0px 6.4px 19.1px -1.9px rgba(15, 41, 107, 0.1),
    0px 20px 60px -2.5px rgba(15, 41, 107, 0.1);
  background-color: var(--blue);
  border-radius: 30px;
`

const WriteButton: React.FC = () => {
  return (
    <Link href={'/write'}>
      <Button>
        <PenIcon width={24} height={24} fill="#fff" />
        <div>Write</div>
      </Button>
    </Link>
  )
}

export default WriteButton
