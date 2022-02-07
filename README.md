<!-- AUTOMATION BADGES -->

[![Deploy to Firebase](https://github.com/webceyhan/ng-organic-shop/actions/workflows/firebase.yml/badge.svg)](https://github.com/webceyhan/ng-organic-shop/actions/workflows/firebase.yml)

<!-- LOGO (OPTIONAL) -->
<!-- <img src="./src/assets/hero.png" width="100px"> -->


<!-- HEADER ///////////////////////////////////////////////////////////// -->

# Angular Organic Shop Application

This is a very simple online grocery shop application which covers many aspects of the Angular Framework using Firebase Authentication and Realtime Database as backend.

[View Demo](https://organic-shop-92b11.web.app) |
[Report Issue](https://github.com/webceyhan/ng-organic-shop/issues) |
[Request Feature](https://github.com/webceyhan/ng-organic-shop/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

<br>
<!-- REQUIREMENTS /////////////////////////////////////////////////////// -->

## Requirements

You need to install the [Node.js](https://nodejs.dev/)
and `npm` package manager first.

> Recommended IDE:
> [VSCode](https://code.visualstudio.com/) + [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

<br>
<!-- INSTALLATION //////////////////////////////////////////////////////// -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/ng-organic-shop.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd ng-organic-shop
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```

<br>
<!-- USAGE /////////////////////////////////////////////////////////////// -->

## Usage

You can use following commands to do various task with the project.

```sh
npm start               # start development server
npm run test            # run test suits
npm run build           # build for production
```

> Take a look at the other scripts in [`package.json`](./package.json)

<br>
<!-- DEVELOPMENT ///////////////////////////////////////////////////////// -->

## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<br>
<!-- TESTING ///////////////////////////////////////////////////////////// -->

## Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

<br>
<!-- BUILDING //////////////////////////////////////////////////////////// -->

## Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

<br>
<!-- DEPLOYMENT ////////////////////////////////////////////////////////// -->

## Deployment (Firebase)

A GitHub Action will automatically deploy the project to Firebase on every push.

> See the details in [.github/workflows/firebase.yml](./.github/workflows/firebase.yml)

1. Create a [Firebase](https://firebase.google.com/) account.

2. Install the `firebase-cli` globally.

    ```sh
    npm install -g firebase-tools
    ```

3. Initialize new Firebase project inside your project folder.

    ```sh
    firebase init
    
    # Configure files for Firebase Hosting and (optionally) st up GitHub Action deploys

        # ? What do you want to use as your public directory? dist

        # ? Configure as a single-page app (rewrite all urls to /index.html)? Yes

        # ? Set up automatic builds and deploys with GitHub? Yes

        # ? File dist/index.html already exists. Overwrite? No

        # ? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) webceyhan/vue-splendid-food

        # ? Set up the workflow to run a build script before every deploy? Yes
    ```

    > This will create a new application on Firebase cloud, a firebase.json configuration for hosting and a GitHub Action for deployment, inside your project folder.

    > It also generates the required secrets in your GitHub repository as follows;

    ```yaml
    FIREBASE_SERVICE_ACCOUNT_ORGANIC_SHOP_92B11
    ```


<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [Angular](https://angular.io/)
-   [Bootstrap](https://getbootstrap.com)
-   [TypeScript](https://www.typescriptlang.org)
-   [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
-   [GitHub Actions](https://docs.github.com/en/actions)
    -   [Firebase](https://firebase.google.com/)
    -   [action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy)
