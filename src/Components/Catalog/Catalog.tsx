'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Pagination,
} from '@mui/material';

import { ViewList, ViewModule } from '@mui/icons-material';
import { Product } from '@/types/Product';
import { EmblaOptionsType } from 'embla-carousel'
import Form from './Form';
import GridComponent from './Grid';
import TableComponent from './Table';
import ModalEditProduct from './ModalEditProduct';
import ModalDetails from './ModalDetails';
import EmblaCarousel from '../Carousel/EmblaCarousel';





const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Estado para alternar entre grade e lista
  const [currentPage, setCurrentPage] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);


  const itemsPerPage = 8; // Número de itens por página

  // Produtos para a página atual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Funções de Paginação
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const placeholderImage = 'https://placehold.co/150'; // URL do placeholder

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price > 0 &&
      newProduct.stock >= 0
    ) {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: `PROD-${Date.now()}`,
          image: newProduct.image || placeholderImage,
        },
      ]);
      setNewProduct({
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: '',
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    handleCloseModal()
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
      setEditProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    handleCloseModal()
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    filterProducts(value, filterCategory);
  };

  const handleFilterCategory = (category: string) => {
    setFilterCategory(category);
    filterProducts(search, category);
  };


  const filterProducts = (searchValue: string, categoryValue: string) => {
    setFilteredProducts(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          (categoryValue ? p.category === categoryValue : true)
      )
    );
  };
  

  const OPTIONS: EmblaOptionsType = {}
  const SLIDES = [];
  for (let i = 0; i < filteredProducts.length; i += itemsPerPage) {
    const currentSlice = filteredProducts.slice(i, i + itemsPerPage);
    SLIDES.push(
      viewMode === 'grid' ? (
        <GridComponent
          handleCardClick={handleCardClick}
          placeholderImage={placeholderImage}
          currentProducts={currentSlice} />
      ) : (
        <TableComponent
          handleCardClick={handleCardClick}
          currentProducts={currentSlice}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
        />
      )
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setNewProduct({ ...newProduct, image: reader.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    filterProducts(search, filterCategory);
  }, [products, search, filterCategory]);


  return (
    <Box>
      {/* Formulário para Adicionar Produto */}
      <Form
        handleAddProduct={handleAddProduct}
        handleImageUpload={handleImageUpload}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />

      {/* Filtros e Pesquisa */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <TextField
          label="Pesquisar Produto"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
        />
        <Select
          value={filterCategory}
          onChange={(e) => handleFilterCategory(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Todas as Categorias</MenuItem>
          <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
          <MenuItem value="Roupas">Roupas</MenuItem>
          <MenuItem value="Alimentos">Alimentos</MenuItem>
        </Select>
      </Box>

      {/* Botão de Alternância entre Grid e Lista */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <IconButton
          color={viewMode === 'grid' ? 'primary' : 'default'}
          onClick={() => setViewMode('grid')}
        >
          <ViewModule />
        </IconButton>
        <IconButton
          color={viewMode === 'list' ? 'primary' : 'default'}
          onClick={() => setViewMode('list')}
        >
          <ViewList />
        </IconButton>
      </Box>

      {/* Exibição dos Produtos conforme o Modo de Visualização */}
      {currentProducts.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Não há produtos para exibir.
        </Typography>
      ) : (
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      )}

      {/* Modal para Editar Produto */}
      {editProduct && (
        <ModalEditProduct
          editProduct={editProduct}
          handleUpdateProduct={handleUpdateProduct}
          setEditProduct={setEditProduct}
        />
      )}
      {selectedProduct && (
        <ModalDetails
          handleCloseModal={handleCloseModal}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
          isModalOpen={isModalOpen}
          selectedProduct={selectedProduct}
        />
      )}
    </Box>
  );
};

export default ProductCatalog;