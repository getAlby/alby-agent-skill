# NWC Client

## How to install

Install the NPM package `@getalby/sdk`. The latest version is 7.0.0.

## Connection Secret

To interact with a wallet you need a NWC connection string (Connection Secret) which gives permissioned access to the user's wallet. It must be handled like a secure API key, unless explicitly specified it's a public, receive-only connection secret.

## Units

All referenced files in this folder operate in millisats (1000 millisats = 1 satoshi).

When displaying to humans, please use satoshis (rounded to a whole value).

## Initialization

```ts
import { NWCClient } from "@getalby/sdk/nwc";
// or from e.g. https://esm.sh/@getalby/sdk@7.0.0

const client = new NWCClient({
  nostrWalletConnectUrl,
});
```

## Referenced files

Make sure to read the [NWC Client typings](./nwc.d.ts) when using any of the below referenced files.

- [subscribe to notifications of sent or received payments](./notifications.md)
- [How to pay a BOLT-11 lightning invoice](pay-invoice.md)
- For some environments, a [websocket polyfill](./references/websocket-polyfill.md) may be required
