import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import useHabitStore, { Habit } from '../../store/store'
import { CheckCircleRounded, DeleteRounded } from '@mui/icons-material'

const Habit_list: React.FC = () => {

    const { habits, removeHabit, toggleHabit } = useHabitStore()

    const today_date = (new Date().toString().split("GMT")[0]).split(" ").splice(0, 4);
    const today = today_date.join(" ");

    const month = new Date(Date.parse(today_date[3] + " " + today_date[1])).getMonth() + 1;
    const total_days = new Date(parseInt(today_date[3]), month, 0).getDate();

    const getStreak = (habit: Habit) => {

        let streak = habit.completedDates.length;
        return streak
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4
        }}>
            {
                habits.map((habit) => (
                    <Paper sx={{ padding: 2 }} elevation={4} key={habit.id}>
                        <Grid container alignItems={"center"}>
                            <Grid xs={12} sm={6}>
                                <Typography variant={"h6"}>{habit.name}</Typography>
                                <Typography variant={"body2"} color={'text.secondary'}>{habit.frequency}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button variant='outlined'
                                        color={
                                            habit.completedDates.includes(today) ?
                                                "success" :
                                                "primary"
                                        }
                                        startIcon={<CheckCircleRounded />}
                                        onClick={() => toggleHabit(habit.id, today)}
                                    >
                                        {
                                            habit.completedDates.includes(today) ?
                                                "Completed" :
                                                "Mark Complete"
                                        }
                                    </Button>
                                    <Button variant='outlined'
                                        color='error'
                                        startIcon={<DeleteRounded />}
                                        onClick={() => removeHabit(habit.id)}>Remove</Button>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2 }}>
                            <Typography>Current Streak : {getStreak(habit)}</Typography>
                            <LinearProgress variant='determinate' value={(getStreak(habit) / total_days) * 100} />
                        </Box>
                    </Paper>
                ))
            }
        </Box>
    )
}

export default Habit_list