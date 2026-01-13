# Alby Agent Skill

Build lightning wallet functionality into your apps with your favorite agent, without hallucinations.

This repository contains an [agent skill](https://agentskills.io/specification) that helps agents use the [Alby JS SDK](https://github.com/getAlby/js-sdk) and [Alby Lightning Tools](https://github.com/getAlby/js-lightning-tools).

## Getting Started

[Download](https://github.com/getAlby/alby-agent-skill/archive/refs/heads/master.zip) this repository and extract it, then follow instructions for your specific agent.

> Double check the skill is activated by asking your agent "What Skills are available?". It should include "Alby Agent Skill"

### Claude Code

Make a `.claude/skills` folder in your project and put the extracted skills folder there ([see other options](https://code.claude.com/docs/en/skills#where-skills-live))

### Gemini CLI

Make a `.gemini/skills` folder in your project and put the extracted skills folder there ([see other options](https://geminicli.com/docs/cli/skills/#skill-discovery-tiers))

## Example prompts

### Console Apps

#### Listen to received payments and send a payment to a lightning address with USD amounts

> Create a JS console app that when receives a notification of an incoming payment, sends $0.10 USD to <hello@getalby.com>. The NWC_URL is in the .env file. Make sure to use agent skills.

### Frontend Apps

#### Streamer QR page with payment notifications

> Create a single page HTML app that listens to incoming payments, and each time one comes in, shows a confetti animation and the payment amount and message. It should also have a QR code of the receiving lightning address that should be displayed on the corner of the screen so people watching can easily send payments. When I first open the page it should prompt me for a NWC connection secret so it can connect to my wallet to listen for payments, and also extract the lightning address from the NWC connection secret for the QR code. Make sure to use agent skills.

## Development

Examples are hand-written, but lack the necessary typing information. Types are copied directly from the referenced projects using [this script](./regenerate-types.sh)