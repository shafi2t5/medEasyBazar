import { discountCalculate } from '@utils/discount';

export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

// Simple CRUD for Item

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.cart_id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  if (item) return item?.is_available;
  return true;
}

export const calculateItemTotals = (items: Item[]) =>
  items?.map((item) => {
    let price = priceInformation(item);
    return {
      ...item,
      price: price,
      itemTotal: price * item?.quantity!,
    };
  });

export const calculateTotalPrice = (items: Item[]) =>
  items?.reduce((total, item) => total + item.quantity! * item.price, 0);

export const calculateTotal = (items: Item[]) =>
  items?.reduce((total, item) => {
    let price = priceInformation(item);
    return total + item.quantity! * price;
  }, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item?.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items?.length;

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0) return items;

  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! = quantity;
    newItems[existingItemIndex].unit! = item?.unit;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

function priceInformation(item: any) {
  let priceData = item?.unit_prices.filter(
    (data: any) => data.unit === item?.unit
  );

  let price = priceData?.[0]?.price;

  if (item?.is_discountable) {
    const { afterDiscount } = discountCalculate(price, item?.discount_value);

    price = afterDiscount;
  }
  return price;
}
