# KODA · 01

> A bespoke desk object that runs your AI.

A custom hardware project — fine-watchmaking sensibility applied to a personal,
always-on AI server. Walnut, brass, smoked glass. A salvaged MacBook Pro logic
board lives behind the pane as a visible mechanism; a modern Framework
mainboard does the actual work, hidden behind it.

---

## Capabilities

- **Overnight agent work** — long-running Claude Code tasks that the user sets
  and walks away from.
- **Personal infrastructure** — Nextcloud, Bitwarden / Vaultwarden, Obsidian
  sync, dashboards, scheduled jobs.
- **Production environment for Koda** — the AI product the user is building to
  commercialise.
- **Phone-controllable** — reachable from the user's iPhone via Tailscale and
  Anthropic's Remote Control. The Claude mobile app drives Claude Code sessions
  on the Engine remotely.

## Physical design

- **Form** — ~30 cm wide × 12 cm tall × 10 cm deep.
- **Material** — walnut billet enclosure; smoked glass front panel revealing
  the visible mechanism.
- **Top edge** — hand-inlaid matte brass Hausa diamond pattern.
- **Corners** — polished antique brass corner brackets at all four corners.
- **Front face** — brass rotary encoder (lower-left), small amber OLED
  (lower-right).
- **Rear** — USB-C, Ethernet, brass push-button power, engraved brass
  nameplate "KODA · 01".

## Hardware (hybrid architecture)

### Visible behind glass — the aesthetic mechanism

- Original logic board from a 2017 13″ MacBook Pro, powered for LEDs and the
  cooling fan. Decorative, alive — but not the brain.
- Salvaged copper heatsink and centrifugal blower from a PS4.

### Hidden — the actual brain

- Framework laptop motherboard (current generation), running
  Ubuntu Server 24.04 LTS.

### Co-processor

- Raspberry Pi 5 (8 GB) — drives the OLED, reads the brass rotary encoder,
  and handles auxiliary services.

### Storage

- 2 TB external NVMe via USB-C, expandable.

## Interaction

- **Brass dial — turn:** cycles OLED display modes.
- **Brass dial — press:** fires pre-configured Claude Code prompts.

### OLED states

| State                              | Meaning           |
| ---------------------------------- | ----------------- |
| `KODA · 14:32`                     | Clock             |
| `KODA · WORKING`                   | Agent active      |
| `KODA · IDLE`                      | Standby           |
| `KODA · 5h 23m / 40h`              | Claude usage      |
| `KODA · LAST: BoE summary 14:21`   | Last completion   |

## System architecture

The Engine sits inside a three-tier system.

- **PUBLIC** — a VPS the user already owns, hosting public-facing sites
  (Marza Intelligence, Koda landing) on his domain.
- **PRIVATE** — the Engine itself, no public IP, accessible only via Tailscale.
- **TUNNEL** — Tailscale (or Tailscale Funnel) connects the two and reaches
  the user's phone.

The user's phone runs the Claude mobile app to drive Claude Code sessions on
the Engine remotely.

## Materials & palette

| Token       | Hex       | Use                                  |
| ----------- | --------- | ------------------------------------ |
| ivory       | `#F5F1E8` | Background, paper                    |
| obsidian    | `#1C1C1C` | Body text                            |
| brass       | `#B89968` | Accents, hardware, dividers          |
| brass-deep  | `#8B7548` | Eyebrows, secondary metal            |
| amber       | `#E8A33D` | Active states, OLED, LEDs            |
| walnut      | `#5C3A21` | Enclosure, accent panels             |
| warmgrey    | `#8B8074` | Secondary text                       |

## Aesthetic register

> Loro Piana × Teenage Engineering × Apple.

- Editorial pace; restrained motion; warm side-lighting; deep shadows.
- Typography: Fraunces (display), Inter Tight (body), JetBrains Mono (technical).
- Hausa diamond brass border as a recurring decorative motif.

## Build phases

1. **Get Linux running** — bench-build, Ubuntu Server, Tailscale, phone reach.
2. **Enclosure** — walnut, glass, brass, Hausa inlay, nameplate.
3. **Integrations** — dial + OLED, MBP-board LED-only wiring, dial-fire prompts.

---

*This document is the source of truth for the prototype. Edit
`src/content/prd.md` to update the spec; the `/spec` route renders it
live.*
