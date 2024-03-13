Project created for [Primatime](https://primatime.com/)

Based on own created [webpack configuration](https://github.com/PanteleevDev/webpack-base)

`npm run start` - starts project on `localhost:3000`

Task includes 4 steps:

- Create `Input` that can be used with or without `react-hook-form` library.
- Fetch data from `http://universities.hipolabs.com/search?country=Czech+Republic&name=[name]` endpoint
- Create `ComboBox` component that use `Input` inside and can be used with or without `react-hook-form` library.
- Create example form with fields `name` and `university` that use `react-hook-form`.

Unit tests not included

Main stack of project:

- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [TanStack Query](https://tanstack.com/)
- [floating-ui](https://floating-ui.com/)

Main example contains in `src/Components/panels/react-hook-form-panel`. Also there is example without `react-hook-form` in `src/Components/panels/native-panel` that need to be uncommented in `src/Components/app` to use.