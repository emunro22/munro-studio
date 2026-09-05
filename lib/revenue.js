// Stripe's standard UK-card rate is 1.5% + 20p per successful charge (higher
// for non-UK/Amex cards) - these are just the defaults; the actual rate is
// editable in Settings since it depends on the card mix and Stripe plan.
export function estimateStripeFee(amount, feePercent, feeFixed) {
  const gross = Number(amount) || 0;
  const fee = gross * (Number(feePercent) / 100) + Number(feeFixed);
  return Math.round(fee * 100) / 100;
}

export function netOfStripeFee(amount, feePercent, feeFixed) {
  const gross = Number(amount) || 0;
  const fee = estimateStripeFee(gross, feePercent, feeFixed);
  return Math.round((gross - fee) * 100) / 100;
}
