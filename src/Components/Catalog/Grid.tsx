'use client'
import { Product } from '@/types/Product'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'

interface IGridComponent{
    currentProducts: Product[]
    handleCardClick: (product: Product) => void;
    placeholderImage: string
}

export default function GridComponent({currentProducts, handleCardClick, placeholderImage}:IGridComponent) {
    return (
        <Grid container spacing={2}>
            {currentProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                        onClick={() => handleCardClick(product)}
                        style={{ position: 'relative', cursor: 'default' }}
                    >
                        <CardContent
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                src={product.image ? product.image : placeholderImage} // Use o placeholder caso não haja imagem
                                alt={product.name}
                                width={150}
                                height={150}
                                style={{
                                    marginBottom: '8px',
                                }}
                            />
                            <Typography variant="h6">{product.name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
