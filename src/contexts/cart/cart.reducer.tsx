import {
  Item,
  UpdateItemInput,
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
} from './cart.utils';

interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: 'ADD_ITEM_WITH_QUANTITY'; item: Item; quantity: number }
  | { type: 'REMOVE_ITEM_OR_QUANTITY'; id: Item['id']; quantity?: number }
  | { type: 'GET_ITEM'; item: Item }
  | { type: 'UPDATE_ITEM'; id: Item['id']; item: UpdateItemInput }
  | { type: 'REMOVE_ITEM'; id: Item['id'] }
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
    case 'ADD_ITEM_WITH_QUANTITY': {
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      );
      // return generateFinalState(state, items);
    }
    case 'REMOVE_ITEM_OR_QUANTITY': {
      const items = removeItemOrQuantity(
        state.items,
        action.id,
        (action.quantity = 1)
      );
      // return generateFinalState(state, items);
    }
    case 'GET_ITEM': {
      return generateFinalState(state, action.item);
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.items, action?.id);
      // return generateFinalState(state, items);
    }
    case 'UPDATE_ITEM': {
      const items = updateItem(state.items, action.id, action.item);
      // return generateFinalState(state, items);
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
    delivery_fee: items?.delivery_fee,
    chargeAmount: items?.charge_free_order_amount,
    minimumOrder: items?.minimum_order,
  };
};
