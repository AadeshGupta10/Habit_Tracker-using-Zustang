import { Paper, Typography } from '@mui/material'
import React from 'react'
import useHabitStore from '../../store/store'

const Stats: React.FC = () => {

    const { habits } = useHabitStore();

    const today = (new Date().toString().split("GMT")[0]).split(" ").splice(0, 4).join(" ");

    const completedToday = () => {
        let completed = 0;

        habits.map((habit) => {
            habit.completedDates.includes(today) && completed++;
        })

        return completed;
    }

    const longestStreak = () => {

        let longest = 0;

        habits.map((habit) => {

            const streak = habit.completedDates.length;

            if (streak >= longest) {
                longest = streak;
            }
        })

        return longest;
    }

    return (
        <Paper sx={{ padding: 2, mt: 2, display: "flex", flexDirection: 'column', gap: 1 }}
            elevation={2}>
            <Typography variant={"h6"}>Habit Statistics</Typography>
            <Typography variant={"body2"} color={'text.secondary'}>Total Habits: {habits.length}</Typography>
            <Typography variant={"body2"} color={'text.secondary'}>Completed Today: {completedToday()}</Typography>
            <Typography variant={"body2"} color={'text.secondary'}>Longest Streak: {longestStreak()}</Typography>
        </Paper>
    )
}

export default Stats