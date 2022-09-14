export const roundDecimals = (num, places) => {
    return +(parseFloat(num).toFixed(places));
}
