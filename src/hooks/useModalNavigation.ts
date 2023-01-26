import { RootState } from '@/store/reducers'
import { useSelector } from 'react-redux'

const useModalNavigation = () => {
  const { currentPage, currentMenu, pageId } = useSelector((state: RootState) => state.pageReducer)
  const navigate = (page: string, data: any) => {}
  return { navigate }
}

export default useModalNavigation
