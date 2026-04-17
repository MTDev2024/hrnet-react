# HRnet — React

Migration of the HRnet internal HR application from jQuery to React for WealthHealth.

---

## Stack

- **React 19** + **Vite 8**
- **React Router v7** - client-side navigation
- **Zustand** - state management with localStorage persistence
- **TanStack Table v8** - employee list with sorting, filtering, pagination
- **react-datepicker** - date picker (replaces jQuery datetimepicker)
- **react-select** - dropdown menus (replaces jQuery UI selectmenu)
- **modal-mtdev2024** - custom React modal component (replaces jquery.modal)
- **Tailwind CSS v4** - utility-first styling

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Production Build

```bash
npm run build
npx serve dist --single
```

---

## Features

- Create Employee form with 9 fields
- Employee List with search, sort and pagination
- Data persisted in localStorage via Zustand
- 0% jQuery, 100% React

---

## Related

- [modal-mtdev2024](https://www.npmjs.com/package/modal-mtdev2024) - npm package
- [react-hrnet-modal](https://github.com/MTDev2024/react-hrnet-modal) - modal component repo

## License

MIT © MTDev2024
