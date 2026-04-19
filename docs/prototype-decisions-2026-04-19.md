# ShopFloor prototype decisions, 2026-04-19

These decisions came from direct rapid-fire MVP prompts with Nate while shaping the ShopFloor prototype.

## Product direction
- ShopFloor should do all three: help people find local practical help, show what people can do, and share tools/resources.
- The first job is led by finding local practical help.
- The first release should feel like all of the following at once:
  - useful board
  - local repair network
  - mutual-aid utility
  - working neighborhood infrastructure
- In public-facing copy, **local repair network** should lead.

## Trust and identity
- Trust should lean first on **mutual connections / neighborhood proximity**.
- Shop cards should show **skills + tools + field notes + neighborhood** by default.
- The main public proof of usefulness should be **field notes**.
- Identity should stay light in MVP: **handles are fine**.
- Neighborhood should visually lead on the shop card.

## Requests and feed behavior
- Request matching should optimize first for **nearby helper**.
- Feed ranking should care more about **distance / neighborhood closeness** than generic chronology.
- Request categories should be **tight core plus other**.
- Requests can be broad in scope for MVP, but only with **clear exclusions and moderation rules**.
- People should need a **full profile with bio** before posting a request.
- People who only know someone else should be able to respond only **after trust threshold**.

## Field notes
- Resolved requests should require a **field note before close**.
- No soft encouragement-only model. The knowledge artifact is part of the work.

## Tools
- Tool inventory in MVP should be **structured list + lendable + availability**.
- Do not build full lending/reservation logistics yet.

## Tone
- MVP tone should be a **mix of utility-first and blue-collar competent**.

## Why this matters
These decisions should drive both the prototype UI and the eventual Supabase schema so sample data does not drift away from the backend model.
