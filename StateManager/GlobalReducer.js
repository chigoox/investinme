import { filterObject } from "../app/Support/myCodes/Util";

export const initialGlobalState = {
   newPost: false,
   
};
export const GlobalReducer = (state, action) => {
   
   

    switch (action.type){
        case "SAVE_GLOBAL": {
            return action.value
      }
      case "ADD_TO_CART": {
          
         return {
            ...state,
            
         };
      }

      case "NEW_POST": {
          
         return {
            ...state,
            newPost: !state.newPost,
            
         };
      }
      
       default:
        return state;
   }
};

