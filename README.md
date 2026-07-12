# ShopFloor

ShopFloor is a neighborhood repair and survival network for working people in mid-size cities, starting in Akron.

It is designed to help people:

- find someone local who can actually help fix something;
- trade tools, labor, and practical knowledge;
- document what worked through structured field notes;
- build trust through usefulness instead of polish.

This is not a gig app.  
This is not another social platform.  
This is city-level repair infrastructure for normal people.

## Why this exists

In places like Akron, a huge amount of survival knowledge already exists, but it is trapped in:

- text threads;
- family networks;
- side conversations;
- Facebook groups;
- luck;
- one old head who knows everything and does not use apps right.

That means people lose time, money, and stability because:

- they cannot find someone local and trustworthy fast enough;
- they cannot tell who actually knows what they are doing;
- repair knowledge disappears instead of compounding;
- useful people stay invisible.

ShopFloor turns that into usable local infrastructure.

## Core objects

### Shop card

A practical profile focused on usefulness:

- what I can fix;
- what I can teach;
- what I can lend;
- what I need help with;
- what area I am in;
- how I prefer to help.

### Help request

A structured post for a real-world need.

### Field note

A short structured record of:

- what broke;
- what fixed it;
- what it cost;
- what tools were needed;
- how long it took;
- whether the fix was safe, temporary, or janky but good enough.

### Resource/support data

Local support options, tools, rides, printers, ladders, code scanners, and other useful local assets may support the help loop. They are not a standalone rental marketplace or public endorsement directory.

## MVP promise

> I can post what broke, find someone local who might actually help, and leave behind a useful note when it gets solved.

## Current app status

ShopFloor now has a SvelteKit prototype under `app/` with:

- public release gate;
- shared app shell/navigation;
- Supabase client/auth scaffold;
- shop card creation;
- help request creation;
- live-capable feed with sample fallback;
- request detail with sample fallback and local-support panel;
- shop detail with field-note display;
- Markdown knowledge base routes;
- public About/mission page;
- tester support/feedback route;
- field-note archive and field-note creation v0.

The app is still gated. Do not treat this repo as public-alpha-ready until release, privacy/RLS, and public-copy gates are deliberately approved.

## Initial focus

Start with Akron.  
Neighborhood first, not everywhere first.

Likely early categories:

- car;
- housing;
- appliance;
- paperwork;
- ride/help getting somewhere;
- tool borrow;
- yard/outdoor;
- kid/family pinch help.

## Product principles

- usefulness over polish;
- local before broad;
- trust over growth hacks;
- documented fixes over feed sludge;
- practical people first;
- relationship as infrastructure;
- no public ratings or humiliation mechanics;
- no gig-economy extraction disguised as help.

## Developer notes

App root:

```bash
cd app
npm run check
npm run build
```

Public release remains gated through `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE`.
