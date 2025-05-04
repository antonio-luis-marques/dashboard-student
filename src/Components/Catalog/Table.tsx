import { Product } from '@/types/Product';
import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'


interface ITableComponent{
    currentProducts: Product[]
    handleCardClick: (product: Product) => void;
    handleEditProduct: (product: Product) => void;
    handleDeleteProduct: (id: string) => void;
}


export default function TableComponent(
    {
        currentProducts, 
        handleCardClick, 
        handleEditProduct, 
        handleDeleteProduct

    }:ITableComponent) {
  return (
    <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Estoque</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}
                  onClick={() => handleCardClick(product)}
                  style={{ position: 'relative', cursor: 'default' }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}