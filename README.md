# usepubsub

> Simple pubsub hook for react

[![NPM](https://img.shields.io/npm/v/usepubsub.svg)](https://www.npmjs.com/package/usepubsub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save usepubsub
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'usepubsub'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [slynch13](https://github.com/slynch13)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
