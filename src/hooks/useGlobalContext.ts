import {GlobalContext} from '@/store';
import {useContext} from 'react';

function useGlobalContext() {
  const [state, dispatch] = useContext(GlobalContext);

  return [state, dispatch];
}

export default useGlobalContext;
