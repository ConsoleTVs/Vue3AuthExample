# Vue 3 authentication example

A state of the art implementation for authentication using the composition API and vue router.

## Goals

The goal of this exmaple is to provide a state of the art, clean implementation of authentication
that follows the vue conventions and, in addition, satisfies the following statements:

- Uses `Composition API` and `Vue 3`
- Uses `vue-router` to determine what pages are protected and what pages are not.
- Does **not** use a global reactive variable that could theoretically be shared among apps and instead uses `provide/inject` to provide authentication on the app level.
- HoC component to do the job instead of a plugin because `provide/inject` needs to be inside a `setup()`.
