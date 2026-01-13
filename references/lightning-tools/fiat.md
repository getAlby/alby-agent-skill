# Examples

IMPORTANT: read the [typings](./index.d.ts) to better understand how this works.

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
