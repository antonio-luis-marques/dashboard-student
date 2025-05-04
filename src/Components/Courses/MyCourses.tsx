'use client'

import Link from 'next/link'
import React from 'react'
import {
    Box,
    Typography,
    Button,
    ThemeProvider,
    LinearProgress,
    Chip,
} from '@mui/material'
import { courses } from '../../../data/MyCourses'
import Image from 'next/image'
import { useContextCategoryCourse } from '../Provider/CategoryCourseProvider'
import { Course as CourseType } from '../../../models/mycourse'
import theme from '../../../theme'

export default function Course() {
    const { categoryCourse } = useContextCategoryCourse()

    const filteredCourses = categoryCourse
        ? courses.filter(course => course.category === categoryCourse)
        : courses

    const getStatusColor = (status: CourseType['status']) => {
        switch (status) {
            case 'não iniciado':
                return 'default'
            case 'em andamento':
                return 'warning'
            case 'concluído':
                return 'success'
            default:
                return 'default'
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr',
                    },
                }}
            >
                {filteredCourses.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            backgroundColor: 'white',
                            color: '#1e293b',
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'box-shadow 0.3s ease',
                            '&:hover': {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                position: 'relative',
                                cursor: 'pointer',
                                backgroundColor: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                src={item.cover}
                                alt={item.title}
                                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                width={400}
                                height={192}
                                unoptimized
                            />
                        </Box>
                        <Box className="space-y-3 p-2">
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Categoria: {item.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Instrutor: {item.instructor}
                            </Typography>

                            <Chip
                                label={item.status}
                                color={
                                    item.status === 'não iniciado'
                                        ? 'info'
                                        : item.status === 'em andamento'
                                            ? 'warning'
                                            : 'success'
                                }
                                sx={{ fontWeight: 500, width: 'fit-content' }}
                            />

                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Progresso: {item.status === 'não iniciado' ? '0%' : item.status === 'concluído' ? '100%' : `${item.progresso}%`}
                            </Typography>

                            {/* Barra de Progresso */}
                            <LinearProgress 
                                variant="determinate" 
                                value={item.status === 'não iniciado' ? 0 : item.status === 'concluído' ? 100 : item.progresso} 
                            />
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'flex-end',
                                p: 2,
                                justifyContent: 'center', // centraliza o botão horizontalmente
                            }}
                        >
                            <Link href={`/course?id=${item.id}`} passHref style={{ width: '100%' }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        borderColor: item.status === 'não iniciado' ? '#0070f3' : '#228B22',
                                        color: item.status === 'não iniciado' ? '#0070f3' : '#228B22',
                                        '&:hover': {
                                            backgroundColor: item.status === 'não iniciado' ? '#0070f3' : '#228B22',
                                            color: '#fff',
                                        },
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        width: '100%',
                                    }}
                                >
                                    {item.status === 'não iniciado' ? 'Iniciar' : 'Continuar'}
                                </Button>
                            </Link>
                        </Box>

                    </Box>
                ))}
            </Box>
        </ThemeProvider>
    )
}