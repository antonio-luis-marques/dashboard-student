import { Product } from '@/types/Product';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface IModalEditProduct {
    setEditProduct: Dispatch<SetStateAction<Product | null>>;
    editProduct: Product | null;
    handleUpdateProduct: () => void;
}

export default function ModalEditProduct(
    { setEditProduct,
        editProduct,
        handleUpdateProduct }:
        IModalEditProduct) {
    return (
        <Dialog open onClose={() => setEditProduct(null)}>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome"
                    fullWidth
                    value={editProduct!.name}
                    onChange={(e) =>
                        setEditProduct({ ...editProduct!, name: e.target.value })
                    }
                    margin="dense"
                />
                <TextField
                    label="Categoria"
                    fullWidth
                    value={editProduct!.category}
                    onChange={(e) =>
                        setEditProduct({ ...editProduct!, category: e.target.value })
                    }
                    margin="dense"
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    value={editProduct!.description}
                    onChange={(e) =>
                        setEditProduct({ ...editProduct!, description: e.target.value })
                    }
                    margin="dense"
                />
                <TextField
                    label="Preço (MT)"
                    type="number"
                    fullWidth
                    value={editProduct!.price}
                    onChange={(e) =>
                        setEditProduct({
                            ...editProduct!,
                            price: Number(e.target.value) || 0,
                        })
                    }
                    margin="dense"
                />
                <TextField
                    label="Estoque"
                    type="number"
                    fullWidth
                    value={editProduct!.stock}
                    onChange={(e) =>
                        setEditProduct({
                            ...editProduct!,
                            stock: Number(e.target.value) || 0,
                        })
                    }
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setEditProduct(null)} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleUpdateProduct} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
