# Examples

IMPORTANT: read the [typings](./index.d.ts) to better understand how this works.

## Decode an invoice

```ts
import { Invoice } from "@getalby/lightning-tools/bolt11";
const decodedInvoice = new Invoice({ pr: paymentRequest });
```

## Verify a preimage for an invoice

```ts
decodedInvoice.validatePreimage(preimage)
```
