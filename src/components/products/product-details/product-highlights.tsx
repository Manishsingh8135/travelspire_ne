import { Product } from '@/types/products/base-product';
import { InfoCard } from '../../ui/info-card';

interface ProductHighlightsProps {
  product: Product;
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  if (!product.highlights?.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.highlights.map((highlight, index) => (
            <InfoCard
              key={index}
              title={`Highlight ${index + 1}`}
              content={highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
