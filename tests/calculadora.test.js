const calculadora = require("../models/calculadora.js");
test("somar 2+2 deveria retornar 4", () => {
  const somar = calculadora.somar(2, 2);
  console.log(somar);
  expect(somar).toBe(4);
});
test("somar 5+100 deveria retornar 105", () => {
  const somar = calculadora.somar(5, 100);
  console.log(somar);
  expect(somar).toBe(105);
});
