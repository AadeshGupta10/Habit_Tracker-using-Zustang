import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Add_habit from './components/Add Habbit/Add_habit';
import Habit_list from './components/Hablit list/Habit_list';
import Stats from './components/Stats/Stats';

const App: React.FC = () => {

  return (
    <Container>
      <Box>
        <Typography variant='h4' component="h4" gutterBottom align='center'>
          Habit Tracker
        </Typography>

        {/* Form */}
        <Add_habit />

        {/* List */}
        <Habit_list />

        {/* Stats */}
        <Stats />
      </Box>
    </Container>
  )
}

export default App