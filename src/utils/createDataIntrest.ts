export function createDataIntrest(
  mortageMonthPay: number,
  intrestRange: Array<number>,
  loanBalanceRange: Array<number>,
  equetyRange: Array<number>
) {
  let arr = [];
  const range = intrestRange.length -1
  for (let i = 0; i <  range; i++) {
    console.log(intrestRange[i]);
    let iR = intrestRange[i];
    let lR = loanBalanceRange[i];
    let eR = equetyRange[i];
    // debugger

    let ob = createData(i, mortageMonthPay, Number(iR.toFixed(2)), Number(lR.toFixed(2)),Number(eR.toFixed(2)) );
    arr.push(ob);
    
  }
  return arr;
}

function createData(
    month: number,
    mortageMonthPay: number,
    intrest: number,
    loanBalance: number,
    equety: number
) {
    let m = Number(month)+1
 return  { m,  mortageMonthPay, intrest, loanBalance, equety }

}
