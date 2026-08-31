# AssetMind AI

**An AI-powered issuance and compliance copilot for restricted private-credit assets on Stellar.**

AssetMind helps issuers, fund managers and compliance officers configure, validate, simulate and prepare
tokenized private-credit issuance. The AI is a **copilot** — it drafts, recommends, configures, validates and
explains. A human always reviews and signs the final transaction with a connected Stellar wallet.

> AI recommends. Humans decide.

This is a frontend prototype. All data is fictional demo / testnet content — nothing here represents a real
investment opportunity, and no live Stellar, Freighter, or Leontief integration exists yet (see
`src/services/*.ts` for clearly-labeled mocks).

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Recharts + Lucide React + React Router.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The landing page is at `/`; the issuer app shell lives under `/app`.

## Product workflow

```
Issuer → AI Copilot → Asset Configuration → Compliance → Privacy → Simulation → Human Approval → Stellar / Leontief
```

1. **Issuance Copilot** (`/app/copilot`) — describe an issuance in plain language; the AI drafts a configuration
   in a live side panel. Nothing is submitted or signed at this stage.
2. **Create Private Credit Issuance** (`/app/create`) — 5-step guided workflow: Define Asset → Configure Rules
   → Compliance → Privacy → Review & Sign. The final step runs the Issuance Simulator, then walks through the
   AI Copilot → Human Review → Wallet signature pipeline.
3. **Compliance Studio** (`/app/compliance`) — SEP-8 policy preview, transfer restrictions, clawback, investor
   eligibility, with AI explanations of each control (workflow assistance only, not legal advice).
4. **Privacy Studio** (`/app/privacy`) — an animated zero-knowledge eligibility proof concept: investors prove
   verification status without exposing identity documents. Labeled prototype / testnet concept throughout.
5. **Issuance Simulator** (`/app/simulator`) — validates a configuration end-to-end before human review.
6. **Human Approval** (`/app/approval`) — the human-in-the-loop checkpoint. The AI never signs on a user's
   behalf; a human reviews the summary and signs with Freighter (mocked in this prototype).

## Structure

- `src/pages` — routed pages: Landing, Dashboard, IssuanceCopilot, Assets ("My Issuances"), Marketplace
  ("Issuance Library"), AssetDetail ("Issuance Detail"), CreateAsset, Compliance, Privacy, Simulator,
  HumanApprovalPage, Transactions ("Activity"), Settings.
- `src/components` — reusable UI, including issuance-specific building blocks: `IssuanceStatus`,
  `ComplianceStatus`, `PrivacyProof`, `AIRecommendation`, `HumanApproval`, `SimulationTimeline`,
  `LeontiefIntegration`, `AssetConfiguration`. `components/landing` holds the marketing page sections.
- `src/services/stellar.ts` — Stellar integration layer. Mocked with realistic latency; every write requires
  human approval to call. Signatures are written so real Horizon/Soroban/Freighter calls can replace the mocks
  without touching UI code.
- `src/services/ai.ts` — mock issuance-drafting and compliance-explanation logic (copilot only, never executes).
- `src/services/leontief.ts` — integration concept for handing a configured issuance to Leontief's ld-shares
  infrastructure. No live integration exists; clearly labeled as prototype.
- `src/services/privacy.ts` — mock zero-knowledge eligibility proof generation.
- `src/data` — mock private-credit issuances and activity feed (Demo / Testnet).
- `src/types` — shared TypeScript interfaces (`Issuance`, `ComplianceConfig`, `PrivacyConfig`, etc).

## Notes on positioning

- The MVP is intentionally narrow: **private credit only**, not a general RWA marketplace.
- The primary customer is an issuer / fund manager / compliance officer / Stellar anchor — not a retail investor.
- Leontief is presented as an integration concept AssetMind builds toward, not a live or competing product.
