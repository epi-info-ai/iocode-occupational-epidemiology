# Epi Info AI Occupational Epidemiology capability package

This repository is the reference capability-package pilot for the legacy Epi
Info Check Code `IOCODE` statement:

```text
IOCODE Industry, Occupation, ICode, OCode, ITitle, OTitle, Scheme
```

Version 0.1.0 is approved only as a **synthetic package-import demonstration**.
It contains no NIOSH model, legacy DLL, proprietary taxonomy, patient data, or
executable extension. Installing it may demonstrate manifest, digest,
capability, compatibility, license, and validation-evidence checks. It must not
enable occupational coding or produce codes.

## Mirrors

- Authoritative CDC GitLab repository:
  `https://git.cdc.gov/epi-info-ai/package-occupational-epidemiology`
- Public GitHub mirror:
  `https://github.com/epi-info-ai/iocode-occupational-epidemiology`

Published package versions must contain identical manifests and artifact
digests on both hosts.

## Boundary

Epi Info AI core owns the typed IOCODE grammar, seven-field validation,
capability lookup, atomic result contract, review boundary, and audit receipt.
This package profile owns specialist model/taxonomy assets, model documentation,
validation evidence, and teaching material. Executable adapters remain
application-shipped and allowlisted; packages cannot install JavaScript,
Workers, arbitrary WebAssembly, DLLs, or network authority.

## Contents

- `epi-info-capability.json` — prototype package manifest.
- `examples/iocode-check-code-tour.chk` — reviewable IOCODE source.
- `fixtures/package-boundary.json` — synthetic package-boundary expectations.
- `docs/model-card-placeholder.md` — evidence still required before execution.
- `scripts/verify-package.mjs` — dependency-free manifest and digest check.

Run `node scripts/verify-package.mjs` in CI or locally. The verifier is only a
repository integrity check; Epi Info AI remains the authority for import policy.

## Promotion gates

An executable release requires documented redistribution rights, an approved
NIOSH-compatible browser adapter, a pinned model and taxonomy version,
independent candidate-ranking fixtures, qualified occupational-health review,
privacy review, atomic seven-field assignment, offline/resource testing, and
Chromium/Firefox/WebKit evidence.

## License

Repository-authored source and documentation are licensed under Apache-2.0.
That license does not apply to any future third-party model or taxonomy; each
such artifact must declare and pass its own license review before inclusion.
