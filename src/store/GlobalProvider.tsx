import React from 'react'; // Import the 'React' module

import {useReducer} from 'react';
import Context from './Context';
import reducer, {initState} from './reducer';

type Props = {
  children: React.ReactNode;
};
function GlobalProvider({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export default GlobalProvider;
