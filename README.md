# tslint-vertical-import

for the eslint implementation check: https://github.com/eydrian/eslint-vertical-import

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



### known issues
- only works with indent two
- only works with dangling comma enabled
- doesn't work with prettier
- doesn't work for combined import e.g.
```typescript
import lib, { StatementOne, StatementTwo } from 'lib';
// must be written as:
import lib from 'lib';
import {
  StatementOne,
  StatementTwo,
} from 'lib';
```

which is ugly...

Feel free to optimize

## Want to support me?

<a href="https://www.buymeacoffee.com/eydrian" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Please consider supporting me if you find this useful.