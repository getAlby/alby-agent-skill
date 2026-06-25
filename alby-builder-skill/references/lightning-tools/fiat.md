# Examples

IMPORTANT: read the [typings](./index.d.ts) to better understand how this works.

## Get a list of fiat currencies

Useful to give the user ability to pick a currency, or verify if a fiat currency is supported.

```ts
import { getFiatCurrencies } from "@getalby/lightning-tools/fiat";
const fiatCurrencies = await fiat.getFiatCurrencies();
```

## Fiat amount to Sats

```ts
import { getSatoshiValue } from "@getalby/lightning-tools/fiat";
const satoshi = await getSatoshiValue({
  amount,
  currency, // e.g. "USD"
});
```

## Sats to Fiat

```ts
import { getFiatValue } from "@getalby/lightning-tools/fiat";
const fiatValue = await getFiatValue({
  satoshi,
  currency,
});
```
