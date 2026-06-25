# Example

IMPORTANT: read the [typings](./nwc.d.ts) to better understand how this works.

```ts
const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

const preimageBytes = crypto.getRandomValues(new Uint8Array(32));
const preimage = toHexString(preimageBytes);

const hashBuffer = await crypto.subtle.digest("SHA-256", preimageBytes);
const paymentHashBytes = new Uint8Array(hashBuffer);
const paymentHash = toHexString(paymentHashBytes);

const response = await client.makeHoldInvoice({
  amount,
  description: "NWC HODL invoice example",
  payment_hash: paymentHash,
});

const onNotification = async (notification) => {
  if (notification.notification.payment_hash !== paymentHash) {
    return;
  }
  
  // ... here you would have some conditional application logic
  // later choose from one of the below. As an example we decide to settle the invoice:
  await client.settleHoldInvoice({ preimage });
  // or you could cancel the invoice, so the user's payment is cancelled:
  await client.cancelHoldInvoice({ payment_hash: paymentHash });
};

const unsub = await client.subscribeNotifications(onNotification, [
  "hold_invoice_accepted",
]);

// later you can call unsub(); to unsubscribe from listing to hold invoice notifications
```
