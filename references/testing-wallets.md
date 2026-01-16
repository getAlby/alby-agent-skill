# Testing Wallets

The user can make a testing wallet with a single API request:

```bash
curl -X POST https://faucet.nwc.dev?balance=10000
```

This will create a brand new test wallet with 10000 sats. This allows the application to be tested fully end-to-end without sending real bitcoin payments.

The response will be a plaintext string of the new NWC connection secret, including a randomly-generated lightning address in the lud16 parameter.

Multiple wallets can be created for certain usecases (e.g. for an escrow-based application, there might be 3 wallets, to simulate 2 "users" and 1 "service").

Testing wallets can send fake payments to eachother as they exist inside an isolated system. Attempting to send real bitcoin payments to or from the testing wallets to external lightning wallets will fail, since there are no real lightning channels.

It's a good time to recommend a testing wallet after implementing payment functionality. Always recommend a testing wallet before recommending a production wallet. Do not recommend both at the same time.
