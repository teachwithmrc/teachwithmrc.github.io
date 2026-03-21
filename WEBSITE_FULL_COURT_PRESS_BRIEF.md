# Intervention Station Full-Court-Press Brief

Last updated: 2026-03-21

## What the website is really selling

Intervention Station is not just a worksheet site.

The strongest version of the offer is:

- Teachers can generate fresh reading and math practice on demand.
- Those generators are backed by scaffolded printables, reading supports, games, and songs.
- Everything lives inside one membership so teachers stop hunting across multiple sites.

The live homepage already points in this direction:

- "Stop Searching for Worksheets. Make Them." is the headline on the live homepage.
- The homepage treats generators as the lead product and the rest of the library as added depth.
- The membership is framed as one place for reading, math, songs, and games.

Key source files:

- Live homepage: `index.html`
- Live homepage behavior: `tabs.js`
- Deeper product map: `workingdesign/workingdesign.js`
- Mobile/browser prototype with strongest sales framing: `mobile/index.html`

## Current website areas

### 1. Live homepage

Primary file: `index.html`

This is the clearest current public-facing structure.

Main areas:

- Hero/top banner
- Generators tab
- Scaffolded Math tab
- SOR Reading tab
- Interactive Games tab
- Learning Songs tab
- What's Inside tab
- Bottom membership CTA

Primary live actions:

- `https://member.interventionstation.com/join`
- `https://member.interventionstation.com/login`
- internal jump to generator previews

### 2. Generator preview system

Primary files:

- `index.html`
- `tabs.js`
- `mobile/mobile-embed.html`
- `mobile/mobile-embed.js`
- `mobile/generators/*.html`

What it does:

- Lets a teacher preview real reading and math generators.
- Loads interactive generator pages inside iframes.
- Allows generating new examples.
- Locks printing behind membership.

This is the strongest conversion asset in the repo because it shows the product working instead of just describing it.

### 3. Scaffolded Math library

Live homepage cards currently surface:

- Place Value
- Rounding
- Addition
- Multiplication
- Division
- Decimals
- Fractions

Broader product map from `workingdesign/workingdesign.js` also includes:

- Google Puzzles

This lane is the "I need support pages, not just a generated worksheet" part of the offer.

### 4. SOR Reading library

Live homepage cards currently surface:

- Heart Words
- Phonics Comics
- Fix the Mix Up
- Pick the Pic
- High Frequency Word Pyramids
- Spelling by Phonics Skill

Broader product map from `workingdesign/workingdesign.js` also includes:

- Blending Slides
- Phonics Mazes
- Spelling Google Sheets

This lane is the "explicit reading intervention support" part of the offer.

### 5. Interactive Games

Current surfaced game areas:

- Reading Games
- Math Games
- Games Library

This lane broadens the value stack and gives you "engagement" messaging, but it is not the sharpest lead offer.

### 6. Learning Songs

Current surfaced song areas:

- Learning Songs Library
- Slide Supports
- Teaching Resources

Broader map from `workingdesign/workingdesign.js`:

- Math Learning Songs
- Science Learning Songs

This lane is useful for differentiation and variety, but again it is supporting value, not the clearest first hook.

### 7. Prototype / alternate sales pages

Important files:

- `mobile/index.html`
- `workingdesign/workingdesign.html`
- `site-preview-march3rd/home-preview-sales.html`
- `site-preview-march3rd/home-preview-sales-combined.html`

These are not the main live experience, but they contain some of the clearest sales language in the repo and are worth mining for campaign copy.

## Product inventory

### Generator count

The repo consistently supports the "19 generators" claim.

Breakdown from `workingdesign/workingdesign.js`:

- 12 math generators
- 7 SOR generators

### Math generators

- Rounding
- Addition Generator
- Subtraction Generator
- Multiplication Generator
- Partial Products
- Long Division
- Long Division Scaffold
- Manipulatives / Hundreds Chart
- Ten Frames
- Coin Counter
- Math Tic Tac Toe
- Math Roll and Read

### SOR generators

- Fluency Grid
- Word Mapping
- Word Ladder
- Roll and Read
- Pyramid Spelling
- Spelling With Pictures
- Reading Tic Tac Toe

## How the products work

### Core workflow

The most persuasive internal explanation appears in the sales previews:

1. Pick a skill.
2. Click generate.
3. Print and teach.

That is the product in its simplest form.

### What the generators actually do

Across the mobile generator previews, the pattern is:

- The teacher opens a generator for a specific skill or format.
- They can click `Generate` to make a fresh worksheet or problem set.
- They can see a real preview on screen.
- `Print` is blocked unless they join.

This matters because the product promise is not static downloads. It is repeatable creation.

### Membership gate behavior

The mobile preview system consistently uses a freemium structure:

- generation is visible and usable
- printing is locked
- join CTA appears inside the preview flow

Examples:

- `mobile/generators/fluency-grid.html` has `Generate`, `Print`, and a print-lock modal with a join link.
- `mobile/generators/long-division-scaffold.html` explicitly says "Generate is enabled. Printing is locked for members."

This is a good sales mechanic because it lets the teacher experience value before paying.

## Current counts and value claims in the repo

The repo repeatedly uses these offer numbers:

- 19 generators
- 48+ math resources
- 200+ reading supports
- 29 songs

These appear across the live homepage and supporting previews.

## Pricing

The repo does contain the current price in newer working pages:

- `$9.99 a month`

The strongest explicit pricing language I found is in `workingdesign/workingdesign.html`:

- "Unlock every generator, printable, game, and song for only $9.99 a month."

Important note:

- The live homepage at `index.html` does not appear to foreground the `$9.99/month` price yet.
- Some preview flows still point to older or inconsistent join destinations.

## The strongest positioning on the site right now

If we boil everything down, your best positioning is:

"This saves busy teachers time by turning one skill into unlimited fresh practice, with support resources in the same membership."

The message becomes strongest when it emphasizes:

- less prep
- less worksheet hunting
- easier small groups
- easier differentiation
- usable tomorrow
- one membership instead of many tabs

## What is primary vs secondary in the offer

### Primary hook

Generators.

Why:

- They are the clearest before/after transformation.
- They are interactive and demonstrable.
- They directly solve a painful teacher problem.
- They create recurring value, which justifies a monthly membership.

### Secondary value

- Scaffolded math supports
- SOR reading collections
- games
- songs

These make the membership feel deeper and more complete. They help retention and strengthen the value stack, but they should support the generator-first pitch, not replace it.

## Best customer pains the site can speak to

These are the pains already supported by the repo copy and product flow:

- "I need practice for tomorrow and do not have time to search."
- "My intervention groups need more repetition than one worksheet gives me."
- "I need differentiated practice by skill."
- "I am tired of opening twenty tabs to plan one lesson."
- "I need resources that work for small groups, centers, reteach, homework, and intervention."

## Best customer outcomes to sell

- Teachers save prep time every week.
- Teachers can make exactly what a group needs.
- Teachers can keep reusing the membership all year.
- Students get fresh practice without the teacher rebuilding materials.
- The same skill can be taught in multiple ways: worksheet, support printable, song, game, or routine.

## Website strengths

- The core offer is strong and practical.
- The generator previews are legitimately compelling.
- The library is broad enough to feel like a membership, not a single-product purchase.
- The product suits recurring subscription language because teachers need repeated fresh practice.
- The repo already contains better sales messaging than the current live homepage fully uses.

## Website gaps and risks

### 1. The price is not prominent enough on the live homepage

At `$9.99/month`, price should be an advantage, not a hidden detail.

### 2. The site still feels split between live pages and prototypes

There is a strong live homepage, but also many preview and working files with overlapping messaging. That makes it easy for the clearest sales story to stay trapped in non-live pages.

### 3. Some join paths are inconsistent

The repo uses multiple membership/join destinations depending on page:

- `https://member.interventionstation.com/join`
- older `interventionstation.com/test-page#...` joins inside generator locks
- prototype paths like `../sign-up`

Before campaign traffic ramps up, this should be cleaned up so every path drives to the same clean signup flow.

### 4. The broad library can dilute the lead message

If the homepage tries to lead equally with generators, printables, games, and songs, the main reason to buy gets softer.

### 5. The live homepage does not fully weaponize the `$9.99/month` story

At that price, the message should feel like:

- "This is a no-brainer if it saves you even one hour."
- "You are not paying for one worksheet."
- "You are unlocking a teacher time-saving machine."

## Clearest campaign angles

These are the best angles to use in emails and landing page updates.

### Angle 1. Stop searching. Make it.

Best for cold or broad teacher audiences.

Promise:

- stop hunting for worksheets
- generate what you need now

### Angle 2. Small groups made easier

Best for interventionists, RTI, special ed, and classroom teachers doing groups.

Promise:

- faster prep
- easier differentiation
- more repetition without more planning

### Angle 3. More than worksheets

Best for people who might think the membership is too narrow.

Promise:

- generator plus support printable plus song plus game
- one membership, many ways to teach the same skill

### Angle 4. Worth it at $9.99

Best for conversion and urgency.

Promise:

- one month costs less than most teacher purchases that save far less time
- if it saves one planning block, it pays for itself

### Angle 5. Fresh practice all year

Best for retention and lifecycle messaging.

Promise:

- not a one-time download
- keeps helping every week

## Best one-sentence summary

Intervention Station gives teachers one membership where they can generate fresh reading and math practice on demand, then pull the scaffolded printables, songs, and games that support the same skill.

## Best short value stack

- 19 generators
- 48+ math resources
- 200+ reading supports
- 29 songs
- all for $9.99/month

## Best plain-English pitch

Teachers are not paying for one worksheet. They are paying for the ability to make fresh practice whenever students need more, plus a library of supports that helps them teach the same skill in multiple ways.

## Immediate recommendations before heavy campaign work

1. Make sure every join CTA points to the same signup flow.
2. Put `$9.99/month` on the live homepage in a very visible way.
3. Lead harder with generators as the main reason to join.
4. Use the rest of the library as proof that the membership goes deeper than one tool.
5. Build email campaigns around pain, speed, and repeat use, not around generic "resources."

## Best next move for email campaigns

Write campaigns in this order:

1. Time-saving / stop searching angle
2. Small-group and intervention angle
3. Generator demo angle
4. "$9.99 is a no-brainer" conversion angle
5. Songs/games/resources as bonus-value angle

## Working message to keep repeating

Stop searching for worksheets. Make exactly what your students need, then teach the skill with the rest of the library.
