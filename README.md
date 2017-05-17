# LibSize

Go to [libsize.com](https://libsize.com) and throw the url to the library into the box. It'll tell you the size of the library.
It'll simply download what's behind the url and return the raw size as well as the gzipped size. Easy peasy. For now, I suggest
using [https://unpkg.com](https://unpkg.com) urls to check npm package sizes.

### API

libsize.com also exposes an API:

```
https://libsize.com/json?url=https://unpkg.com/react@15.5.4/dist/react.min.js
```

Give the URL to weigh as the query parameter `url`. This is what the UI uses.

## Future plans

This is the very first version of Libsize that I threw together in an evening.
In the future, libsize.com will accept Github repo paths and npm package names.
