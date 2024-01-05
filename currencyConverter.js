import { currencyCodeAndCountry } from "./array.js";
let input = document.querySelector("input");
let fromValue = document.getElementById("from");
let toVlaue = document.getElementById("to");
let dropdown = document.querySelectorAll(".select-currency");
let converterButton = document.querySelector("form button");
let msg = document.querySelector(".msg");
let currencyExchangeIcon = document.querySelector("#currency_exchange");

for (let select of dropdown) {
  for (let currency in currencyCodeAndCountry) {
    let option = document.createElement("option");
    option.innerText = currency;
    option.value = currency;
    if (select.name === "from" && currency === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && currency === "INR") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (e) => {
    let flagCode = e.target.value;
    let img = select.previousElementSibling;
    img.src = `https://flagsapi.com/${currencyCodeAndCountry[flagCode]}/flat/64.png`;
  });
}

const updateMsg = (fromCountry, toCountry, inp, currency) => {
  msg.innerText = `${inp}${fromCountry} = ${currency}${toCountry}  `;
};
const handleChangeCurrencyConv = async (e) => {
  e.preventDefault();
  let inpVal = input.value;
  let fromVal = fromValue.value;
  let toVal = toVlaue.value;
  let response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromVal.toLowerCase()}/${toVal.toLowerCase()}.json`
  );
  let data = await response.json();
  if (inpVal === "" || inpVal < 1) {
    input.value = "1";
    inpVal = "1";
  }
  let currencyFinalValue = data[toVal.toLowerCase()] * inpVal;
  updateMsg(fromVal, toVal, inpVal, currencyFinalValue);
};
currencyExchangeIcon.addEventListener("click", handleChangeCurrencyConv);
converterButton.addEventListener("click", handleChangeCurrencyConv);
window.addEventListener("load", handleChangeCurrencyConv);
