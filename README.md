# LibSize

### This project is currently unmaintained.

LibSize tells you (approximately) how much a package will add to your bundle size.

### API

libsize.com also exposes an API:

```
https://libsize.com/json?url=https://unpkg.com/react@15.5.4/dist/react.min.js
```

Give the URL to weigh as the query parameter `url`. This is what the UI uses.

## Future plans

This is the very first version of Libsize that I threw together in an evening.
In the future, libsize.com will accept Github repo paths and npm package names.
