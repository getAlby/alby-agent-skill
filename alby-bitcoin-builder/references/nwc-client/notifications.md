# Notifications

Subscribe to be notified in real time when a payment is sent or received by the wallet.

**This is the correct way to react to wallet activity.** Do NOT poll `listTransactions` or `lookupInvoice` on a timer to detect new payments or check whether an invoice has been paid — it wastes bandwidth, adds latency, and hammers the relay and wallet service. A single `subscribeNotifications` call delivers `payment_received` and `payment_sent` events over the existing Nostr relay connection as soon as they happen.

IMPORTANT: read the [typings](./nwc.d.ts) to better understand the `Nip47Notification` shape (notification types, transaction fields, amounts in millisats).

## Basic usage

```ts
const unsub = await client.subscribeNotifications((notification) => {
  // notification.notification_type is "payment_received" or "payment_sent"
  // notification.notification is a Nip47Transaction
  console.info("Got notification", notification);
});

// Later, when you no longer need the subscription:
unsub();
```

## Filtering by type

```ts
const unsub = await client.subscribeNotifications(
  (notification) => {
    const tx = notification.notification; // Nip47Transaction
    console.info(`Received ${tx.amount / 1000} sats`, tx.description);
    // e.g. update your UI, mark an order as paid, append to a transaction list, etc.
  },
  ["payment_received"], // only listen for incoming payments
);
```

## Keeping a transaction list up to date

If you're displaying a transaction list, fetch it ONCE with `listTransactions` on initial load, then use `subscribeNotifications` to prepend new entries as they arrive. Do NOT re-fetch `listTransactions` periodically.

```ts
let transactions = (await client.listTransactions({ limit: 50 })).transactions;

const unsub = await client.subscribeNotifications((notification) => {
  transactions = [notification.notification, ...transactions];
  renderTransactions(transactions);
});
```

## Waiting for a specific invoice to be paid

Instead of polling `lookupInvoice` or `listTransactions`, subscribe to `payment_received` and match on `payment_hash`:

```ts
function waitForPayment(paymentHash: string): Promise<Nip47Transaction> {
  return new Promise(async (resolve) => {
    const unsub = await client.subscribeNotifications((notification) => {
      if (notification.notification.payment_hash === paymentHash) {
        unsub();
        resolve(notification.notification);
      }
    }, ["payment_received"]);
  });
}
```

## Cleanup

Always call the returned `unsub()` when the subscription is no longer needed (component unmount, app shutdown, user logout) to close the relay subscription cleanly.
