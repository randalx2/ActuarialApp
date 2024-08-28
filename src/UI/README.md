# ActuarialApp

- The ActuarialApp allows you to manage actuarial data related to your current profile.
- Expansion panels on the home page load dynamically from the backend.
- Users are guided by a Wizard when creating or updating Actuarial model data.
- Users can also view and delete existing data related to their current profile.

## Getting Started

### Prerequisites

- A compatible IDE, such as VS Code.
- npm
- Node.js - https://nodejs.org/en/download/
- pnpm - npm install -g pnpm@latest-9
- swc - pnpm i -D @swc/cli @swc/core

### Installation

- Open the project with VS Code and install the recommended extensions.
- To open the project, navigate to the UI folder of the ActuarialApp repo.
- Run `pnpm i` from the terminal to install dependencies.
- Run `pnpm build` from the terminal to check for successful build / compile.

## Development

- Run 'pnpm start' to run react in development mode. This will simulate running your components in your default browser.
- Currently no hot reloading is supported but this can be achieved by installing build tools such as VITE.

## Unit Testing
- Components can be unit tested using Jest.

#### PNPM Pack (Create a local nuget package / plugin based on your app)

1. Run `pnpm run clean-win` on Windows or `pnpm run clean-mac` on Mac to remove your `node_modules` and `lib` folder.

2. Run `pnpm i` to install all dependencies.

3. Run `pnpm build` to build your plugin.

4. Run `pnpm pack` to create a tarball of your plugin in the root directory of the client app.

## Using the tarball in a parent app

1. Open the parent application / portal:

- Pull the latest commits on the parent application.
- In the NX Console (VS Code) for the parent application run the docker-build-all command (This may take a long time depending your connection speed if connected to the GGL VPN)
- After ensuring a successful build, run docker-start-all from the NX Console (This should successfully start the Stack)
- Run `pnpm i` in the console terminal to install any package updates for the parent app.
- Install the actuarial_app_ui tarball package with the path name. Replace `<path-to-file>` and `<version>` with your current parameters. Example: `pnpm i C:\dev\gtp-plugins-actuarial_app_ui-0.1.0.tgz`

  ```
  pnpm i <path-to-file>\actuarial_app_ui-<version>.tgz
  ```

- Save your changes in the parent app client code and navigate to the Actuarials page in the parent app.
- The Acturials page should now render.

2. Note that each time changes are made to the plugin code, you will have to uninstall the current tarball from GTP using `pnpm uninstall <path-to-file>` and reinstall the new updated tarball from AB Testing in order to view these changes. To create a new tarball in AB Testing, steps 1-4 need to be repeated.

## Documentation

- [React](https://reactjs.org/docs/getting-started.html)
- [React Query](https://react-query.tanstack.com/overview)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [SWC](https://swc.rs/)
- [Vite](https://vitejs.dev/)
