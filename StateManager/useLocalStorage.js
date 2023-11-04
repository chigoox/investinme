import { useEffect } from 'react';
import { useAUTHListener } from './AUTHListener';
import { addToDatabase } from '../app/Support/myCodes/Database';

function useLocalStorage(state, dispatch, initialGlobalState) {
  const user = useAUTHListener() 
  


     useEffect(() => {
    if (JSON.parse(localStorage.getItem("Global"))) { 
      //checking if there already is a state in localstorage
      dispatch({
        type: "SAVE_GLOBAL",
        value: JSON.parse(localStorage.getItem("Global")), 
        //if yes, update the current state with the stored one
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialGlobalState) {
      localStorage.setItem("Global", JSON.stringify(state));
      if (user.uid || user.gid) addToDatabase('Users', user?.uid ? user?.uid : user?.gid , 'global', { state })
      


      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);
  return (
    []
    
  )
}

export default useLocalStorage