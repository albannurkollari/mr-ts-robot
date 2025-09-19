# Improvement Checklist

## Domain & Architecture

- [x] Expose a **pure core function**: `(env, start, commands) → result` with no CLI dependency.
- [ ] Refactor room bounds into a **strategy pattern**:
  - [ ] `SquareRoom.within(point)`
  - [ ] `CircleRoom.within(point)`
  - [ ] Future room types are drop-in.

## Commands & Languages

- [ ] Decide & document:  
  - [ ] **Normalize** all language commands to a single internal alphabet (e.g. `L/F/R`), OR  
  - [ ] Keep **separate maps** per language (`movementEn`, `movementSv`) for extensibility.  
  - [ ] Justify choice in README.

## Coordinates & Math

- [ ] Document the **axis convention** (Cartesian vs. screen/delta).  
- [ ] Unit test both conventions with the `isCartesianDelta` flag.  
- [ ] Ensure negative rotation (wraparound) is centralized & covered in tests.

## Testing

- [ ] Add **property-based tests** (e.g. fast-check) to assert invariants:  
  - [ ] Robot never leaves bounds when policy = reject.  
  - [ ] Heading is always one of {N,E,S,W} / {N,E,S,W,Ö}.  
- [ ] Add **table tests** for:  
  - [ ] English vs. Swedish command equivalence.  
  - [ ] Edge cases (on the circle border, corners of square).  
- [ ] Keep coverage, but emphasize **meaningful invariants > raw %**.

## TypeScript Strictness

- [ ] Enable & use stricter TS flags where possible:  
  - [ ] `noUncheckedIndexedAccess`  
  - [ ] `exactOptionalPropertyTypes`  
- [ ] Consider **branded/opaque types** for `Position`, `RoomSize`, etc.  
  - Prevents mixing values accidentally.  
  - Mention as a “next step” in interview, even if not fully implemented.

## Tooling & CI

- [ ] Lefthook runs **lint only on staged files**; heavy checks run in CI.  
- [ ] CI should run on:  
  - [ ] Push to `main`  
  - [ ] PRs  
  - [ ] On-demand (`workflow_dispatch`) for coverage.  
- [ ] Be ready to explain how alias resolution issues in Vitest were solved.

## Documentation

- [ ] Add a short **logic summary** in README (inputs → movement → result).  
- [ ] Explicitly state **axis convention** and why both are supported.  
- [ ] Show examples for **both English & Swedish commands**.
