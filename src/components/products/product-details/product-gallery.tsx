import { Product } from '@/types/products/base-product';
import { Gallery } from '../../ui/gallery';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h2>
        <Gallery images={product.gallery} />
      </div>
    </section>
  );
}
