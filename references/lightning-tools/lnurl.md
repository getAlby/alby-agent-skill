# Example

IMPORTANT: read the [typings](./index.d.ts) to better understand how this works.

```ts
import { LightningAddress } from "@getalby/lightning-tools/lnurl";

const ln = new LightningAddress("hello@getalby.com");

await ln.fetch();
const invoice = await ln.requestInvoice({ satoshi: 1000 });
```
