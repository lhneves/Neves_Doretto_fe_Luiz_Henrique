# Tempo Frontend challenge

# Solution Improvement

### Describe what you have improved in the solution

All the improvements are outlined in the PR description, but here are the key ones that I made to the solution:

**Types**
I refactored types names to a more understandable and meaningful name, that don't causes any conflict with functions names.
Fix types of functions return and variables.

**Card**
I refactored the Card component by removing unnecessary props and changing the `columns` prop to only include the keys that are actually needed.
It had a side effects on pages and components that use the Card, so had to make the corresponding changes.

**Functions**
I refactored the names of some functions and made them cleaner since we don't use the `columns` prop anymore.

**Requests**
I applied the [swr](https://swr.vercel.app/) tool from vercel, which helped improve the loading time of requests. Now, the requests no longer take a long time to load. I provided a more detailed explanation of this in the PR.

**Tests**
Implemented test for every component and every page, covering all possible scenarios for each.

## To Run the project you must:

Clone the project: 

```
git clone git@github.com:lhneves/Neves_Doretto_fe_Luiz_Henrique_exercise.git
```

Switch to the development branch 
```
git checkout development
```

And then run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

If you're having trouble with the request, try removing the last slash from the `.env` file. That might fix the issue.

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```
