---
title: Adobe Admin Console Audit Logs Changelog
---

# Admin Console Audit Logs Changelog

Track released changes to the events and payloads.

The **Version** column tracks to the field `metadata.version` in every event payload. If you are
contacting support with any issues, please provide the `metadata.version` as this helps with
investigation.

Note that the format of the version number system is not guaranteed to be stable, so you should not
build any logic or attempt to interpret it, it's purely informational.

As noted elsewhere, we do not consider supporting new fields or value names
as a breaking change - your integration will need to deal with this aspect. Removing a field, or
moving to a new version of OCSF, are considered breaking changes and will be notified as such.

Note that this table only captures significant changes (e.g., new events or fields) - we may
not document internal only changes here. As a result, the version at the top of the table may
not be the one that is currently active, but that is to be expected.

## Changelog

| Version    | Description                                                                     |
|------------|---------------------------------------------------------------------------------|
| 2026.03.10 | Initial public release.                                                         |
