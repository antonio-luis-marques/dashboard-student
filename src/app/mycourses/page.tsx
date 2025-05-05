import CourseCategories from '@/Components/Courses/CourseCategories'
import Course from '@/Components/Courses/MyCourses';
import { Box, Card, Stack } from '@mui/material'
import React from 'react'

export default function MyCourses() {

  return (
    <Box>
      <Stack spacing={4}>
        <CourseCategories />
        <Course />
      </Stack>
    </Box>
  )
}
