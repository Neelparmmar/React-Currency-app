import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ApiFirst } from "./Global.js";
function App() {
  const [CurrencyAll, setCurrencyAll] = useState([]);
  const [Originalrate, setOriginalrate] = useState({});
  const [CurrencyData, setCurrencyData] = useState({
    first: "",
    second: "",
  });
  const [Amount, setAmount] = useState("");
  const [FinalAmount, setFinalAmount] = useState("");
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    const token = "b3905dfedb79263de76ecfd8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(` ${ApiFirst}/b3905dfedb79263de76ecfd8/latest/USD`, config)
      .then((res) => {
        console.log(res);
        const rates = res.data.conversion_rates;
        const currencyList = Object.keys(rates);
        setCurrencyAll(currencyList);
        setOriginalrate(rates);

        console.log(rates);
      });
  };
  const HandleFirstChange = (e) => {
    const currentcurrency = e.target.value;
    setCurrencyData({ ...CurrencyData, first: currentcurrency });
    console.log(CurrencyData.first);
  };
  const HandleSecondChange = (e) => {
    const currentcurrency = e.target.value;
    setCurrencyData({ ...CurrencyData, second: currentcurrency });
    console.log(CurrencyData.second);
  };
  const HandleText = (e) => {
    setAmount(e.target.value);
  };

  const HandleExchangeData = () => {
    const token = "b3905dfedb79263de76ecfd8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let amount = parseInt(Amount);
    axios
      .get(
        ` ${ApiFirst}/b3905dfedb79263de76ecfd8/pair/${CurrencyData.first}/${CurrencyData.second}/${amount}`,
        config
      )
      .then((res) => {
        console.log(res);
        setFinalAmount(res.data.conversion_result);
      });
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter-form">
        <p className="Amount-text">Amount</p>
        <input type="number" className="input-field" onChange={HandleText} />
        <select className="currency-select" onChange={HandleFirstChange}>
          <option>Select Currency</option>
          {CurrencyAll.map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        <span> to </span>
        <select className="currency-select" onChange={HandleSecondChange}>
          <option>Select Currency</option>
          {CurrencyAll.map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={HandleExchangeData}>Convert</button>
      <div className="result">
        {FinalAmount && (
          <p>
            {Amount} {CurrencyData.first + " " + "="} {FinalAmount}{" "}
            {CurrencyData.second}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
