export const valOkButtonEmpty = (
  bankName: string,
  intrestRate: number,
  maxLoan: number,
  minPaymant: number,
  loanTerm: number
) => {
  return (
    bankName === "" ||  intrestRate === 0 || maxLoan === 0 || minPaymant || loanTerm === 0
  );
};
export const valOkButtonUndefined = (
  bankName: string,
  maxLoan: number,
  intrestRate: number,
  minPaymant: number,
  loanTerm: number
) => {
  return (
    bankName === undefined ||
    maxLoan === undefined ||
    intrestRate === undefined ||
    minPaymant === undefined ||
    loanTerm === undefined
  );
};
