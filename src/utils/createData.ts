export  function createData( 
    _id: string,
    name: string,
    minPaymant: number, 
    maxLoan: number, 
    loanTerm: number, 
    intrestRate: number
    ) {
    return { 
        _id,
        name, 
        minPaymant, 
        maxLoan, 
        loanTerm, 
        intrestRate 
    }
  }