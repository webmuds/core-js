# @webmuds/core-js

[![build](https://github.com/webmuds/core-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/webmuds/core-js/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/webmuds/core-js.svg)](https://lgtm.com/projects/g/webmuds/core-js/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/webmuds/core-js.svg)](https://lgtm.com/projects/g/webmuds/core-js/context:javascript)

Core objects for WebMUDs Javascript projects.

## Classes

### `Runtime`

The base Runtime class. Runtime classes are responsible for game logic around a certain resource. E.g., Mud runtimes handle mud-wide logic, Character runtimes handle character-only logic, etc.

### `Resource`

Resources are objects that represent API records. Each Resource points to an API endpoint, and data can be downloaded and updated.

### `Payload`

Payload instances are minimal objects that store data and can be transferred over channels (including Websocket connections). Payload classes map shorthand property names to their full names from the API. Payload instances are used internally by Resource instances to store data.

### `Collection`

An opinionated `Map` extension that only adds objects that have an `id` property. Those collections are extensively used across the codebase to standardize object lookup by ID.

### `Logger`

This is just a wrapper class around `console.log` to make it easier to replace in the future if needed. A global instance is offered in `config/logger.js` that can be imported by other classes.

## License

MIT
