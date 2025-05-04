import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { Pagination } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';

type PropType = {
  slides: React.ReactNode[]; // Aceita JSX ao invés de números
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const updateScrollSnaps = () => setScrollSnaps(emblaApi.scrollSnapList());
    const updateSelectedIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('reInit', updateScrollSnaps);
    emblaApi.on('select', updateSelectedIndex);

    updateScrollSnaps();
    updateSelectedIndex();

    return () => {
      emblaApi.off('reInit', updateScrollSnaps);
      emblaApi.off('select', updateSelectedIndex);
    };
  }, [emblaApi]);

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(page - 1); // MUI Pagination starts at 1
  };

  return (
    <section className="embla w-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls ">
        <Pagination
          count={scrollSnaps.length} // Total de páginas
          page={selectedIndex + 1} // MUI usa indexação começando de 1
          onChange={handlePaginationChange}
          color="primary"
          className="embla__pagination"
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
