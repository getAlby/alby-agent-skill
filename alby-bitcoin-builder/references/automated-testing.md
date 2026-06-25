# Automated Testing

It's important to not just add tests with mocks, but write E2E tests that use wallets that most closely simulate a real environment.

## Throw-away wallets

Throw-away [testing wallets](./testing-wallets.md) can be spun up for use in test frameworks (jest, vitest, playwright etc)

Each test can create brand new wallet(s) as required to ensure reproducable results.

### Code Example

The below example allows for temporary networking errors.

```ts
async function createTestWallet(retries = 3): Promise<{ nwcUrl: string; lightningAddress: string }> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch("https://faucet.nwc.dev?balance=10000", { method: "POST" });
    if (!response.ok) {
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      throw new Error(`Faucet request failed: ${response.status} ${await response.text()}`);
    }
    const nwcUrl = (await response.text()).trim();
    const lud16Match = nwcUrl.match(/lud16=([^&\s]+)/);
    if (!lud16Match) {
      throw new Error(`No lud16 found in NWC URL: ${nwcUrl}`);
    }
    const lightningAddress = decodeURIComponent(lud16Match[1]);
    return { nwcUrl, lightningAddress };
  }
  throw new Error("Failed to create test wallet after retries");
}
```

## What to test

Test both happy path and failure cases (payment failed with insufficient balance etc.)
