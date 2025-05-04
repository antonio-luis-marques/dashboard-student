import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Product } from '@/types/Product';
import CropImage from '../CropImage/CropImage';
import Image from 'next/image';

interface IForm {
    setNewProduct: Dispatch<SetStateAction<Product>>;
    newProduct: Product;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddProduct: () => void;
}

export default function Form({ newProduct, setNewProduct, handleAddProduct, handleImageUpload }: IForm) {
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e); // Chama o método que você passa como prop para atualizar o estado do produto
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageToCrop(imageUrl); // Define a URL da imagem para o corte
            setOpenModal(true); // Abre o modal para cortar a imagem
        }
    };
    
    const handleImageCropped = (croppedImage: string) => {
        setCroppedImage(croppedImage); // Atualiza a imagem cortada localmente
        setNewProduct({ ...newProduct, image: croppedImage }); // Atualiza o estado do produto com a imagem cortada
    };
    
    return (
        <Card sx={{ marginBottom: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Adicionar Novo Produto
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nome"
                            fullWidth
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Categoria"
                            fullWidth
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, category: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descrição"
                            fullWidth
                            multiline
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Preço (MT)"
                            type="number"
                            fullWidth
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Estoque"
                            type="number"
                            fullWidth
                            value={newProduct.stock}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    stock: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            color="primary"
                        >
                            Carregar Imagem
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUploadChange} // Atualiza com a imagem para o corte
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {croppedImage && (
                            <Image
                                src={croppedImage}
                                alt="Produto"
                                width={150}
                                height={150}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {handleAddProduct(); setCroppedImage(null);}}
                            fullWidth
                        >
                            Adicionar Produto
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <CropImage
                image={imageToCrop || ''}
                onImageCropped={handleImageCropped}
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </Card>
    );
}
