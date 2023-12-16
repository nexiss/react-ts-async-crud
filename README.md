# React Typescript Async CRUD

Small project to demostrate how to connect a React app built with Vite, with an API for basic CRUD operations.

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation and execution](#installation-and-execution)
4. [Project Structure](#project-structure)
5. [Contribution](#contribution)

## Introduction

I'm trying to solve the problem of dealing with asynchronous requests and let the user know the state of those requests that are happening in the background.
There is a hook for handling all the active requests, so loading state will not change until all of them has finished.

## Installation and execution

```bash
# Clone the repository
git clone https://github.com/nexiss/react-ts-async-crud.git

# Navigate to the project directory
cd react-ts-async-crud

# Install dependencies
npm install

# Run project in local
npm run dev
```

## Project structure

### UI

The UI is divided in two different sections, Settings and State

- **Settings**: Here the user can specify some parameters of the fuctionality of the requests. At the moment there are 3:
  - `Force requests to fail`: All actions triggered by the user will fail, just to see how the erros are handled
  - `Hide results while loading`: Using the "loading" state, the UI hide old results until next fetch is done
  - `Delay for each requets`: Establishes the amount of time each requests will take, in case you want to play with different timeouts.
- **State**: Displays the current state of the data, and allows the user to interact with it. There are 4 actions:

  - `Fetch`: Fetches data from the database
  - `Add`: Creates a new element in the database and then fetches the data again
  - `Clear`: Resets the state, cleaning all data in the database and then fetches the data again (returning no data, as it should be empty)
  - `Remove`: Removes one element from the database

    The data stored is an `Element` with the minimum required structure, which is an `id` and the `creationDate`

### Code

The `App` component comunicates the `settings` with the `api` and the `request manager` and provides those handlers to the `StateComponent`.
The `StateComponent` uses different hooks to fetch the data and then rendering the result in a table

- `useElementsAPI`: Connection with the state, stored using `useState` hook, but in real scenario it should be connected to wherever the data is persisted, probably a backend API.
- `useRequestManager`: Responsible for handling all the requests detecting when they are finish or still running. Requests can be added when it's created, or removed once it has finished, and there is also a flag provided to let the consumer know if there are requests pending to be resolved.
- `useCRUD`: Takes the responsibility of combining the use of the api and the manager, so the `StateComponent` can interact with only 1 single element

## Contribution

I will take into account any kind of improvement, so feel free to open a PR if something to comes to your mind. I will be happy to take a look.
