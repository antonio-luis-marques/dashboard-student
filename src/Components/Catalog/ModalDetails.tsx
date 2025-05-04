import { Product } from '@/types/Product'
import { Delete, Edit } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'

interface IModalDetails {
    handleDeleteProduct: (id: string) => void
    handleEditProduct: (product: Product) => void
    selectedProduct: Product
    isModalOpen: boolean
    handleCloseModal: () => void
}

export default function ModalDetails(
    { handleDeleteProduct, handleEditProduct, selectedProduct, isModalOpen, handleCloseModal }:
        IModalDetails) {
    return (
        <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
            <DialogTitle>Detalhes do Produto</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{selectedProduct.name}</Typography>
                <Typography variant="body1">{selectedProduct.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Categoria: {selectedProduct.category}
                </Typography>
                <Typography variant="body1">
                    Preço: MT {selectedProduct.price.toFixed(2)}
                </Typography>
                <Typography variant="body2">Estoque: {selectedProduct.stock}</Typography>
            </DialogContent>
            <DialogActions>
                <IconButton
                    color="primary"
                    onClick={() => {
                        handleEditProduct(selectedProduct)
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="secondary"
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                >
                    <Delete />
                </IconButton>
                <Button onClick={handleCloseModal} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
