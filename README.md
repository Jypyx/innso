# INNSO FRONT-END TEST

## Project setup

This project is running with Vue.js and other dependencies :

- Vuex: used for storing data
- Vue Router: used fro nested route/view mapping
- Vue i18n: used for translations
- Axios for requests
- Vue-good-table for data table
- Day.js for date formatting and manipulation
- Lodash for utilities

### Prerequisites

Node.js 14+

### Installation

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Prettier and format SCSS

```bash
yarn format
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Project preview

You can see a preview for this project here: https://innso.netlify.app/

## Features

This project consists in displaying a data table in a logical way and with an appropriate design.
The latter includes the following features:

- Global search (:warning: very bad performance due to local search for 500 entries, with server side search performance could be much better)
- Column sorting and filtering (:triangular_flag_on_post: average performance due to local search for 500 entries, with server side search performance could be much better)
- Pagination (:triangular_flag_on_post: average performance due to local search for 500 entries, with server side search performance could be much better)
- Column reordering: Missing feature due to plugin limitation
