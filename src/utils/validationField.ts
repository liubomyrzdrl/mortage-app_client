export const valOkButtonEmpty = (
  bankName: string,
  intrestRate: number,
  maxLoan: number,
  minPayment: number,
  loanTerm: number
) => {
  return (
    bankName === "" ||  intrestRate === 0 || maxLoan === 0 || minPayment || loanTerm === 0
  );
};
export const valOkButtonUndefined = (
  bankName: string,
  maxLoan: number,
  intrestRate: number,
  minPayment: number,
  loanTerm: number
) => {
  return (
    bankName === undefined ||
    maxLoan === undefined ||
    intrestRate === undefined ||
    minPayment === undefined ||
    loanTerm === undefined
  );
};
