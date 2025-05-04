import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './getCroppedImg';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

type CropImageProps = {
  image: string; // URL ou caminho da imagem
  onImageCropped: (croppedImage: string) => void; // Função de callback para passar a imagem cortada
  open: boolean; // Controle da visibilidade do modal
  onClose: () => void; // Função para fechar o modal
};

const CropImage: React.FC<CropImageProps> = ({ image, onImageCropped, open, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    const croppedImageDataUrl = await getCroppedImg(image, croppedAreaPixels, 150, 150);
    onImageCropped(croppedImageDataUrl); // Passa a imagem cortada para o componente pai
    onClose(); // Fecha o modal após cortar a imagem
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Cortar Imagem</DialogTitle>
      <DialogContent>
        <div style={{ position: 'relative', width: '100%', height: 400 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // Força a proporção 1:1
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={showCroppedImage} color="primary">
          Cortar Imagem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropImage;
