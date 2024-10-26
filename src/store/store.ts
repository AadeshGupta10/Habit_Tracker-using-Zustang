import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void,
    toggleHabit: (id: string, dates: string) => void,
    removeHabit: (id: string) => void
}

const useHabitStore = create<HabitState>()(devtools(
    persist((set) => {
        return {
            habits: [],
            addHabit: (name, frequency) => set((state) => {
                return {
                    habits: [
                        ...state.habits, {
                            id: ((state.habits).length + 1).toString(),
                            name,
                            frequency,
                            completedDates: [],
                            createdAt: new Date().toISOString()
                        }
                    ]
                }
            }),
            toggleHabit: (id, date) => set((state) => {
                return {
                    habits: state.habits.map((habit) =>
                        habit.id == id ? {
                            ...habit,
                            completedDates: habit.completedDates.includes(date) ?
                                habit.completedDates.filter((flt) => flt !== date)
                                : [...habit.completedDates, date]
                        }
                            : habit)
                }
            }),
            removeHabit: (id) => set((state) => {
                return {
                    habits: state.habits.filter((habit) => habit.id !== id)
                }
            })
        }
    }, {
        name: "Habit",
        storage: createJSONStorage(() => localStorage)
    }))
)

export default useHabitStore;