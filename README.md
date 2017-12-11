# Kleros front

[![Build Status](https://travis-ci.org/kleros/kleros-front.svg?branch=master)](https://travis-ci.org/kleros/kleros-front) [![Join the chat at https://gitter.im/kleros/kleros-front](https://badges.gitter.im/kleros/kleros-front.svg)](https://gitter.im/kleros/kleros-front?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

## Table of Contents

* [Getting started](#getting-started)
  * [Install dependencies](#install-dependencies)
  * [Run application](#run-application)
  * [POC Ethereum network](#poc-ethereum-network)
* [Storybook](#storybook)
  * [Local](#local)
  * [Remote](#remote)
* [Linter](#linter)
* [Invision](#invision)

## Getting started

### Install dependencies

```
yarn
```

### Run application

```
yarn start
```

Go to http://localhost:3000.

### POC Ethereum network

For the POC, the smart contract are deployed on the
[kovan testnet network](https://kovan-testnet.github.io/website/).

To get some kovan token, you can follow this link
[https://github.com/kovan-testnet/faucet](https://github.com/kovan-testnet/faucet).

## Storybook

We use [Storybook](https://storybook.js.org/).

### Local

```
yarn run storybook
```

Go to http://localhost:9009/.

### Remote

Update Storybook:
```
yarn run deploy-storybook
```

Go to https://kleros.io/kleros-front

## Linter

```
yarn run lint # check lint
yarn run lint-fix # fix lint
```

## Invision

Go [there](https://projects.invisionapp.com/share/SRDBNEDE7#/screens/252442857).
