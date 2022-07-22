export const discountCalculate = (amount: number, percentage: number) => {
  let beforeDiscount = amount;
  let discountAmount = parseFloat(
    ((beforeDiscount * percentage) / 100).toFixed(2)
  );
  let afterDiscount = beforeDiscount - discountAmount;
  return { afterDiscount };
};
