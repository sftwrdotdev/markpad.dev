# Code signing policy

Free code signing provided by [SignPath.io](https://about.signpath.io), certificate by [SignPath Foundation](https://signpath.org).

Official Windows release artifacts (installers and portable packages) are built automatically from the source code in the [Markpad repository](https://github.com/sftwrdotdev/Markpad) using GitHub Actions and signed through SignPath. Every signing request is manually reviewed and approved by an authorized project approver.

Only binaries built directly by Markpad are signed. Third-party libraries or dependencies packaged with the app are distributed as provided by their upstream source projects and do not receive the Markpad signing operation.

Signed Windows files show **SignPath Foundation** as the publisher because the certificate belongs to the foundation, not directly to the Markpad project.

## Team roles

- Committers and reviewers: [Members team](https://github.com/orgs/sftwrdotdev/people)
- Approvers: [Owners](https://github.com/orgs/sftwrdotdev/people?query=role%3Aowner)

## Privacy policy

This program will not transfer any information to other networked systems unless specifically requested by the user or the person installing or operating it.

Markpad is open-source, offline-first, and contains zero telemetry, trackers, or advertisements. Network communication is only performed upon explicit user action (such as clicking external links or downloading updates if initiated). No third-party data collection services are used.
