# Full-Stack Challenge

## Prerequisites

- You have to have Node 20 installed on your machine
- You need to have Docker installed on your machine

## Installation

1. You need a postgres database
2. package.json contains all you need

## Tasks

1. Bears can have one or multiple colors. Create an entity "Color" with a ManyToMany relationship to Bear.
   - First change the code, then run `npm run migration:generate WhateverName`
   - A New typeORM migration will be placed in the root folder. You have to put it in `src/persistence/migrations`
   - When you run the app, the new migration will be run against the database.
   - You have to populate the new tables with data by hand (You can write an SQL script)
2. Create CRUD endpoints for bears and colors
3. Create an endpoint that lets you search for bears by their colors.
4. Write a test for your new endpoint (extend bear.controller.spec.ts).
5. Create a front end for your application in a framework of your choice (e.g. React, VueJS, Angular, etc)
   - The front end should be designed to be extendable modular way
   - Tests are a huge plus
6. Use an AI Code Generation Tool (you can choice the tool, e.g. Cursor, Gemini Code Assist) to implement a feature of your choice to the existing source. Use an extra branch to save the outcome. You need to be able to explain your approach and how you used AI to implement the feature.
  - If you have issues with your free quota, please contact us.
  - You can also use [gemini-cli](https://github.com/google-gemini/gemini-cli) which has a pretty high free quota
  - Please save your prompts somewhere so that we can talk about your usage of the tool