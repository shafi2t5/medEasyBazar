import {
  Item,
  UpdateItemInput,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
  addItemWithQuantity,
} from './cart.utils';

interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: 'GET_ITEM'; items: any }
  | { type: 'UPDATE_ITEM'; id: Item['id']; item: UpdateItemInput }
  | { type: 'REMOVE_ITEM'; id: Item['id'] }
  | { type: 'INCREMENT_ITEM'; items: any }
  | { type: 'TOTAL_ITEM'; total: number }
  | { type: 'RESET_CART' };

export interface State {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  meta?: Metadata | null;
  delivery_fee: number;
  chargeAmount: number;
  minimumOrder: number;
}
export const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  meta: null,
  delivery_fee: 0,
  chargeAmount: 0,
  minimumOrder: 0,
};
export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GET_ITEM': {
      return generateFinalState(state, action?.items);
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.items, action?.id);
      let data: any = {
        medicines: items,
      };
      return generateFinalState(state, data);
    }
    case 'INCREMENT_ITEM': {
      const updatedItems = addItemWithQuantity(
        state.items,
        action.items,
        action.items?.quantity
      );
      let data: any = {
        medicines: updatedItems,
      };

      return generateFinalState(state, data);
    }
    case 'TOTAL_ITEM': {
      return {
        ...state,
        totalItems: action?.total,
      };
    }
    case 'RESET_CART':
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Item) => {
  const totalUniqueItems = calculateUniqueItems(items?.medicines);
  return {
    ...state,
    items: calculateItemTotals(items?.medicines),
    totalItems: calculateTotalItems(items?.medicines),
    totalUniqueItems,
    total: calculateTotal(items?.medicines),
    isEmpty: totalUniqueItems === 0,
    delivery_fee: items?.delivery_fee || state?.delivery_fee,
    chargeAmount: items?.charge_free_order_amount || state?.chargeAmount,
    minimumOrder: items?.minimum_order || state?.minimumOrder,
  };
};
