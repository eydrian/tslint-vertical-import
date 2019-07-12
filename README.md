# tslint-vertical-import

This is a custom [TSLint](https://palantir.github.io/tslint/) rule that checks
for that imports are vertically aligned:

```typescript
  import 'library'; // OK
  import * as library from 'library'; // OK

  import { Library } from 'library'; // BAD

  import { Library, SecondLibrary } from 'library'; // BAD

  import {
  SecondLibrary } from 'library'; // BAD

  import { Library,
  SecondLibrary } from 'library'; // BAD

  import {
    Library,
    SecondLibrary,
  } from 'library'; // OK

  import {
    Library,
    SecondLibrary } from 'library'; // BAD

  import { Library,
    SecondLibrary,
  } from 'library'; // BAD
```

### 📝 Install

Install the package with

`npm install tslint-vertical-import --save-dev` (or `yarn add tslint-vertical-import --save-dev`).

Then add the following to your `tslint.json`:

```
  "rulesDirectory": [
    "tslint-vertical-import"
  ],
  "rules": {
    "vertical-import": true
  }
```
