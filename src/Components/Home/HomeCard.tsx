import React from 'react'
import DashboardCards from './DashboardCards'
import { Box, Typography } from '@mui/material'
import DashboardNotifications from './DashboardRecent'
import CoursesCards from './HomeMyCourses'


export default function HomeCard() {
  return (
    <Box>
      <Box sx={{ marginBottom: 4 }}>
        <DashboardCards />
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" component="h5" gutterBottom>
          Métricas
        </Typography>
        <CoursesCards />
      </Box>
      <Box>
        <DashboardNotifications />
      </Box>
    </Box>
  )
}
