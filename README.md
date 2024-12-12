# Atatus Application Deployment Marker

A GitHub Action to add Atatus deployment markers during your release pipeline.

## Inputs

| Key              | Required | Default | Description |
| ---------------- | -------- | ------- | ----------- |
| `apiKey`         | **yes**  | -       | [See here](https://docs.atatus.com/docs/faq/basics-faq/where-to-find-api-key.html) to locate the API key |
| `projectId`      | **yes**       | -       | A unique identifier for a project. [See here](https://docs.atatus.com/docs/faq/basics-faq/where-to-find-the-project-id.html) to locate the Project ID. |
| `revision`         | **yes**      | -       | Revision being deployed, such as a Git SHA or version. |
| `releaseStage`    | **yes**       | -       | Release stage of the deployment Example, production and staging. |
| `changes`       | no       | -       | Change log or comments to record with this deploy. |
| `user`           | no  | `github.actor` | The name of the user who deployed. |

## Example usage

### GitHub secrets

[Github secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#about-encrypted-secrets) assumed to be set:
* `ATATUS_API_KEY` - API Key (Type - Application Key, Scope - Write)
* `ATATUS_PROJECT_ID` - A unique identifier for a project

>*There are a number of [default GitHub environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables) that are used in these examples as well.*
### Minimum required fields

```yaml
name: Atatus Deployment Tracker

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  atatus:
    runs-on: ubuntu-latest
    name: Atatus
    steps:
      - name: Set Release Version from Tag
        run: echo "RELEASE_VERSION=${{ github.ref_name }}" >> $GITHUB_ENV

      - name: Atatus Application Deployment Marker
        uses: atatus/deployment-marker-action@v1.0.2
        with:
          apiKey: ${{ secrets.ATATUS_API_KEY }}
          projectId: ${{ secrets.ATATUS_PROJECT_ID }}
          revision: ${{ env.RELEASE_VERSION || github.run_number }}
          releaseStage: 'production'
          changes: ${{ github.sha }}
          user: ${{ github.actor }}
```
