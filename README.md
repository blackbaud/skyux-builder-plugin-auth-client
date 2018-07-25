# Auth Email Whitelist

[![npm](https://img.shields.io/npm/v/@blackbaud/skyux-builder-plugin-auth-email-whitelist.svg)](https://www.npmjs.com/package/@blackbaud/skyux-builder-plugin-auth-email-whitelist)
[![status](https://travis-ci.org/blackbaud/skyux-builder-plugin-auth-email-whitelist.svg?branch=master)](https://travis-ci.org/blackbaud/skyux-builder-plugin-auth-email-whitelist)

This [SKY UX Builder](https://github.com/blackbaud/skyux-builder) plugin requires that a user login with a valid Blackbaud email address before accessing the site content.

## Installation

```
npm install --save @blackbaud/skyux-builder-plugin-auth-email-whitelist
```

## Usage

Open **skyuxconfig.json** and add/update the following:

```
{
  "auth": true,
  "plugins": [
    "@blackbaud/skyux-builder-plugin-auth-email-whitelist"
  ]
}
```
