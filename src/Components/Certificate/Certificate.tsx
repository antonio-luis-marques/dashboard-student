'use client'

import React from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material'
import { courses } from '../../../data/MyCourses'


// Certificados já reivindicados
const claimedCertificateIds = ['course-java-001']

export default function CertificatePage() {
  const concludedCourses = courses.filter(course => course.status === 'concluído')

  const unclaimedCourses = concludedCourses.filter(
    course => !claimedCertificateIds.includes(course.id)
  )

  const claimedCourses = concludedCourses.filter(
    course => claimedCertificateIds.includes(course.id)
  )

  return (
    <Box >
      <Typography variant="h4" gutterBottom>
        Meus Certificados
      </Typography>

      {concludedCourses.length === 0 && (
        <Typography>
          Você ainda não concluiu nenhum curso. Conclua cursos para obter certificados.
        </Typography>
      )}

      {concludedCourses.length > 0 && claimedCourses.length === 0 && (
        <Typography sx={{ mb: 2 }}>
          Você ainda não possui certificados. Reivindique seus certificados abaixo.
        </Typography>
      )}

      {/* Cursos concluídos sem certificado */}
      {unclaimedCourses.map(course => (
        <Card
          key={course.id}
          sx={{
            mb: 2,
            border: '1px solid #4caf50',
            boxShadow: 'none',
            width: 'fit-content',
          }}
        >
          <CardContent>
            <Typography variant="h6">{course.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Instrutor: {course.instructor}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ Curso concluído — você pode obter seu certificado
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Obter certificado
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Cursos com certificado já obtido */}
      {claimedCourses.map(course => (
        <Card
          key={course.id}
          sx={{
            mb: 2,
            border: '1px solid #4caf50',
            boxShadow: 'none',
            width: 'fit-content',
          }}
        >
          <CardContent>
            <Typography variant="h6">{course.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Instrutor: {course.instructor}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              🎓 Certificado já obtido
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Visualizar certificado
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}