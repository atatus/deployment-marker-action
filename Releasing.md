# Release Atatus Application Deployment Marker

### Release for production

1. Pump version number in

    - deployment-marker-action
    - package.json

2. Build the package

```bash
    npm run build
```

3. Commit the code [with dist directory]

    git commit
    git tag v1.0.0
    git push origin v1.0.0

4. Release package


### Local development

1. Install dependencies

```bash
npm install
```

2. Run testing in local using act (https://github.com/nektos/act)

```bash
npm run act-test
```