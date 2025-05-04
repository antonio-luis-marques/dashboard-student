export const getCroppedImg = (imageSrc: string, pixelCrop: any, width: number, height: number) => {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        width,
        height
      );

      resolve(canvas.toDataURL());
    };
    image.onerror = (error) => reject(error);
  });
};
