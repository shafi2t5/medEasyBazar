import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';
// import { useLocalStorage } from '@utils/use-local-storage';
interface CartProviderState extends State {
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => any | undefined;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
  setItemsForCart: (data: any) => void;
  setIncrementDecrementForCart: (data: any) => void;
  setTotalItemForCart: (total: number) => void;
}

export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  const clearItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });

  const setItemsForCart = (data: any) =>
    dispatch({ type: 'GET_ITEM', items: data });
  const setIncrementDecrementForCart = (data: any) =>
    dispatch({ type: 'INCREMENT_ITEM', items: data });
  const setTotalItemForCart = (total: number) =>
    dispatch({ type: 'TOTAL_ITEM', total: total });
  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (id: Item['id']) => getItem(state.items, id),
    [state.items]
  );
  const isInStock = useCallback(
    (id: Item['id']) => inStock(state.items, id),
    [state.items]
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
      setItemsForCart,
      setIncrementDecrementForCart,
      setTotalItemForCart,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
