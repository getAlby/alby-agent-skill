# Example

IMPORTANT: read the [typings](./nwc.d.ts) to better understand how this works.

```ts
const onNotification = (notification) =>
  console.info("Got notification", notification);

const unsub = await client.subscribeNotifications(onNotification);

// later you can call unsub(); if you don't need to subscribe any more
```
