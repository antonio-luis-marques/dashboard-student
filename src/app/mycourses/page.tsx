import CourseCategories from '@/Components/Courses/CourseCategories'
import Course from '@/Components/Courses/MyCourses';
import { Card, Stack } from '@mui/material'
import React from 'react'

export default function MyCourses() {
  const cardStyle = {
    boxShadow: 'none',
    border: '1px solid #ccc',
    padding: 4,
    spacing: 4
  };

  return (
    <Card sx={cardStyle}>
      <Stack spacing={4}>
        <CourseCategories />
        <Course />
      </Stack>
    </Card>
  )
}
