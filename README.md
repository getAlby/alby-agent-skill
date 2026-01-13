# Alby Agent Skill

Build lightning wallet functionality into your apps with your favorite agent, without hallucinations.

This repository contains an [agent skill](https://agentskills.io/specification) that helps agents use the [Alby JS SDK](https://github.com/getAlby/js-sdk) and [Alby Lightning Tools](https://github.com/getAlby/js-lightning-tools).

## Getting Started

[Download](https://github.com/getAlby/alby-agent-skill/archive/refs/heads/master.zip) this repository and extract it, then follow instructions for your specific agent.

> Double check the skill is activated by asking your agent "What Skills are available?". It should include "Alby Agent Skill"

### Claude Code

Make a `.claude/skills` folder in your project and put the extracted skills folder there ([see other options](https://code.claude.com/docs/en/skills#where-skills-live))

## Example prompts

### Listen to received payments and send a payment to a lightning address

> Create a JS console app that when receives a notification of an incoming payment, sends 1 sat to <hello@getalby.com>. The NWC_URL is in the .env file. Make sure to use agent skills.

### Conditional payments and USD amounts

> Create a JS console app that rolls a dice, and if the value is 6, sends $0.10 USD to <hello@getalby.com>. The NWC_URL is in the .env file. Make sure to use agent skills.

## Development

Examples are hand-written, but lack the necessary typing information. Types are copied directly from the referenced projects using [this script](./regenerate-types.sh)