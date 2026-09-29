const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getPlanQuote,
} = require("../pricing.js");


test("Base starts without paid media and charges hosting with the first installment", () => {
  const quote = getPlanQuote("base");

  assert.deepEqual(quote.scoops, {
    google: 0,
    meta: 0,
    remarketing: 0,
  });
  assert.equal(quote.setup, 4190);
  assert.equal(quote.entry, 2095);
  assert.equal(quote.remaining, 2095);
  assert.equal(quote.hosting, 390);
  assert.equal(quote.initialPayment, 2485);
  assert.equal(quote.management, null);
  assert.equal(quote.media, 0);
});


test("Performance presets 15 scoops and derives the monthly media budget", () => {
  const quote = getPlanQuote("performance");

  assert.deepEqual(quote.scoops, {
    google: 8,
    meta: 5,
    remarketing: 2,
  });
  assert.equal(quote.totalScoops, 15);
  assert.equal(quote.media, 1500);
  assert.equal(quote.setup, 6490);
  assert.equal(quote.entry, 3245);
  assert.equal(quote.initialPayment, 3635);
  assert.equal(quote.management, 1190);
});


test("Scale presets 30 scoops with the higher management tier", () => {
  const quote = getPlanQuote("scale");

  assert.deepEqual(quote.scoops, {
    google: 14,
    meta: 10,
    remarketing: 6,
  });
  assert.equal(quote.totalScoops, 30);
  assert.equal(quote.media, 3000);
  assert.equal(quote.setup, 8490);
  assert.equal(quote.management, 1790);
});


test("Manual scoop changes recalculate media without changing commercial values", () => {
  const quote = getPlanQuote("performance", {
    google: 10,
    meta: 4,
    remarketing: 1,
  });

  assert.equal(quote.totalScoops, 15);
  assert.equal(quote.media, 1500);
  assert.equal(quote.setup, 6490);
  assert.equal(quote.management, 1190);
});


test("Unknown plans are rejected instead of silently showing the wrong price", () => {
  assert.throws(
    () => getPlanQuote("unknown"),
    /Plano desconhecido/
  );
});
