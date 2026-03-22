import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEmployeeStore = create(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    }),
    {
      name: "employee-storage", // nom de la clé dans le localStorage
    },
  ),
);

export default useEmployeeStore;
