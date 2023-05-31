/**  Calculates the percentage of the given amount and percentage */
function calculat_percentage(percentage, amount) {
  let fee = (amount * percentage) / 100;
  const roundedNumber = parseFloat(fee.toFixed(2));
  return roundedNumber;
}
/**  Calculates the total amount by adding GST, platform fee, and the original amount.*/
function totalAmount(GST, amount, platformfee) {
  let total =
    calculat_percentage(GST, amount) +
    calculat_percentage(platformfee, amount) +
    amount;
  const roundedNumber = parseFloat(total.toFixed(2));

  return roundedNumber;
}

export { calculat_percentage, totalAmount };
