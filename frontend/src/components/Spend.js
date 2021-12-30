import React, { useState, useEffect } from 'react'

const SpendApp = () => {
    const [input_values, set_inputvalues] = useState({
      saved_money: 0,
      spending_money: 0,
      candy_money: 0,
    });
  
    const [total, set_total] = useState(0);
  
    useEffect(() => {
      const arrValues = Object.values(input_values);
      const inputTotals = arrValues.reduce((accum, curr) => (accum += curr), 0);
      set_total(inputTotals);
    }, [input_values]);
  
    const changeValues = ({ name, value }) => {
      set_inputvalues({ ...input_values, [name]: parseInt(value) });
    };
  
    return (
      <div>
          <br/>
          <h3 className="spend-words">Spend It</h3>
        <input
          type="number"
          placeholder="Spending $ Total"
          onChange={({ target }) => changeValues(target)}
          name="saved_money"
          />
        <input
          type="number"
          placeholder="+ Weekly Allowance"
          onChange={({ target }) => changeValues(target)}
          name="spending_money"
          />
        <input
          type="number"
          placeholder="- Candy Total"
          onChange={({ target }) => changeValues(target)}
          name="candy_total"
          />
          <h2>${total}</h2>
          {/* <h4 className="spend-words">Amount Left</h4> */}
      </div>
    );
  };

  export default SpendApp;