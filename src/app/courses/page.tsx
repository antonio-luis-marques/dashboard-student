import CourseCategories from '@/Components/Courses/CourseCategories'
import Course from '@/Components/Courses/Courses'
import {  Box, Stack } from '@mui/material'
import React from 'react'

export default function CourseRoute() {
  return (
    <Box>
      <Stack spacing={4}>
        <CourseCategories />
        <Course />
      </Stack>
    </Box>
  )
}
