# Frontend of Postcards

## Development Environment

* JavaScript
* React Native with EXPO CLI
    * [Node.js LTS](https://nodejs.org/en/) release - `v20.10.0` above, and even numbered version
      recommended. `npm` `v10.1.0` or above should also be installed with the Node.js LTS release installation
    * [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) installed.
    * Check `node -v`, `npm -v` and `watchman -v` for installation verification and versions
* Uses URL endpoint for connection with KnowQuest backend server
* MongoDB Database cluster - `KnowQuestClusterMobile` which can be configured in the `.env` file in backend server
* `jest` is used as the unit test library for this project

## Accessing the Application

* Run `npx expo install` at root directory of project to install all necessary dependencies/libraries to your local
  machine
    * You should see `node_modules` directory in the root that contains all your dependencies
* Configure the backend server URL for API requests in the `.env` file under root directory.
    * If server is running on local machine, avoid using `LOCALHOST` because you may be accessing the application on
      your phone. Use your private IP address instead
* Choose a device to access development build:
    1. Install EXPO GO mobile app on your iOS/Android mobile device via App Store or Google Play Store if you wish to
       access the development build on the phone
    2. Install mobile device simulators
        * [iOS device simulator](https://docs.expo.dev/workflow/ios-simulator/) if you have a Mac environment
        * [Android device simulator](https://docs.expo.dev/workflow/android-studio-emulator/)
    3. If you wish to access the build in a web browser, no additional installation is required other than the necessary
       dependencies
* Launch the development server using `npx expo start`
* Follow the instructions provided by the `EXPO CLI` to test the development build. Note that EXPO provides instant
  updates, meaning once you save the code on your local machine, the development build automatically updates on your
  simulator or mobile device.
* For running automated Unit Tests, execute `npm run test`.

## Development Tips

* `package.json` and `package-lock.json` contains all dependencies and their versions.
  Use `npx expo install <library-name>` to add more dependencies
* `App.js` is the entry point to the application, containing the navigation stack for all pages
* The source files are "page-centric", each page in the application corresponds to a JavaScript file in the `/pages`
  directory.
    * For developing additional pages under the `/pages` directory, make sure to:
        * Add the page into the `pagesIndex.js` file for easy import in other files
        * Add a new component in the navigation stack in the `App.js` file.
* Automated unit test infrastruction is built with the aid of `jest` library.
    * All unit tests in `__tests__` directory will run when `npm run test` command is executed. Producing a report
      including test results and test coverages. A `/coverage` directory will also be generated containing the detailed
      report.
    * See `/pages/__tests__` and `/components/__tests__`.
    * Current tests can be modified, and more test suites or test files can be added.
* Future production build deployment can be accomplished using [`EAS Build`](https://docs.expo.dev/build/introduction/)
  feature in EXPO. The documentation contains relevant information to deploy the App to App Store and Google Play Store.
* For testing purposes, there currently exists two accounts `admin@gmail.com` with password `amdin` and `test@gmail.com`
  with password `test` within the `PostcardsClusterMobile` database that were used regularly under the development
  environment.
