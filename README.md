# Adobe I/O Events Documentation

For prod:
see <https://developer.adobe.com/events/docs/>

For stage:
see <https://developer-stage.adobe.com/events/docs/>

## Git config

```bash
git config core.ignorecase false
```

## How to set navigation

Create a directory hierarchy in `src/pages/config.md`

## Local development

This is not possible at the moment (we're still working on it)

## Launching a deploy

### Automatic Deployment (Stage)

When PRs are merged to the `main` branch, the documentation automatically deploys to the **stage environment**.
This allows you to review changes and share the staging URL with anyone before going live.

### Manual Deployment (Production)

To deploy to production:

1. Go to **Actions** > **Deployment** > **Run workflow**
2. Select your deployment options:
   - **Environment**:
     - `prod` - Production only (default)
     - `stage` - Staging only  
     - `stage & prod` - Both environments
   - **Base SHA**: Optional commit SHA (empty = last commit before HEAD)
   - **Force deploy all files**: `true` to force full deployment (default: `true`)

**Deployment Workflow:**

1. Create PR > merge to `main` > auto-deploys to *stage*
2. Review on *stage* environment
3. When ready, manually deploy to *production* environment

## Where to ask for help

The slack channel [#adobe-developer-website](https://adobe.enterprise.slack.com/archives/C01GU3V8XE0) is our main point of contact for help. Feel free to join the channel and ask any questions.

## Troubleshoot

[The Next Generation Developer Website](https://wiki.corp.adobe.com/display/AdobeCloudPlatform/The+Next+Generation+Developer+Website+-+DevDocs+and+DevBiz#DeveloperWebsite--63309052)
