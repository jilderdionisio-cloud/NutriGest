# NutriGest frontend requirements audit

## Sources and status

| Requirements | Source | Status in source | Existing frontend | Action | Acceptance and dependency |
|---|---|---|---|---|---|
| RF-01 | Doc 2, 11-12 | Defined in plan; validation pending | Email/password login and route guard | Retain and restrict to professional demo | Backend must authorize every API request; route guards are UI-only. |
| RF-02 to RF-04 | Doc 2, 11-12 | Proposed; validation pending | Patient directory was staff-only/local; no consistent records | Adapt to a nutritionist-managed local demo store | Backend needs patient IDs, duplicate rules and field agreement. |
| RF-05 | Doc 2, 11-12 | Proposed | No nutrition history workflow | Add provisional patient-linked history fields | Practice history format remains pending. |
| RF-06 to RF-09 | Doc 2, 11-12 | Proposed | Booking UI incorrectly represented appointments | Replace with local consultation/history/evolution views | Backend persistence and consultation contract required. |
| RF-10 to RF-13 | Doc 2, 11-12 | Proposed | No consistent patient food/notes store | Add local demo fields, drafts and formal-note dependency state | Formal-note template remains pending. |
| RF-14 | Doc 2, 11-12 | Proposed, optional | No scoped note-only UI | Leave simulated, confirmation-gated drafting pending | Backend-mediated AI, review policy and fictitious-only controls required. |
| RF-15 to RF-17 | Doc 2, 11-12 | Candidate/proposed | Booking and automatic-style contact concepts conflicted | Add explicit local follow-up/contact states; remove booking | Six calendar months, exceptions and contact policy require validation. |
| RF-18 to RF-20 | Doc 2, 11-12 | Proposed | No patient-isolated document/audit representation | Add empty/demo states and local correction log | Document operations and audit retention need backend agreement. |
| RC-01 to RC-04 | Doc 2, 11.3 and 12.1 | Defined in plan | Mixed remote calls and non-nutrition modules | Use fictitious local demo records; retain React frontend | Django/DRF, PostgreSQL, deadline and human clinical interpretation remain external constraints. |
| RNF-01 to RNF-04 | Doc 2, 11.3 and 12.1 | Proposed thresholds | No verified benchmark | Keep simulated AI opt-in; measure only if a 300-patient fixture is run | Environment, timings and sample remain pending. |

## Material discrepancies

- The prior booking, physician, vaccines, public registration and family-booking flows are outside the management-plan MVP.
- The plan calls optional AI a medium-priority backlog item; Doc 2 keeps its detailed behavior proposed and validation pending. It must not become a general assistant.
- Doc 1 and Doc 2 cite `GestNutri_Plan_Gestion (2).pdf`; supplied plans are named differently. This audit uses the supplied plan content and does not claim source-version approval.

## Demo assumptions

- Frontend records are fictitious and local only. Local storage is neither a replacement for PostgreSQL nor a security control.
- Most-recent-first consultation ordering and six-calendar-month follow-up are visible demo rules, not client-approved clinical rules.
- No UI action sends WhatsApp messages, persists documents, calls AI, or finalizes clinical recommendations.
