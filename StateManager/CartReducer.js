import { filterObject } from "../app/Support/myCodes/Util";

export const initialGlobalState = {
   newPost: false
};
export const GlobalReducer = (state, action) => {
   
   

    switch (action.type){
        case "SAVE_GLOBAL": {
            return action.value
      }
      case "ADD_TO_CART": {
          
         return {
            ...state,
            lineItems: {...state.lineItems,  [action.value.priceID]:{...action.value, Qty: Number(actionQTY) + Number(stateQTY)}},
            total: stateTotal + actionPrice,
         };
      }
      
       default:
        return state;
   }
};

