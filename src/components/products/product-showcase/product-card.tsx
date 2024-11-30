import { Product } from '@/types/products/base-product';
import { ImageCard } from '../../ui/image-card';
import { GradientBadge } from '../../ui/gradient-badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <ImageCard
      title={product.title}
      subtitle={product.subtitle || ''}
      image={product.heroImage}
      link={`/products/${product.slug}`}
      footer={
        <div className="flex justify-between items-center">
          <GradientBadge>{product.type}</GradientBadge>
          <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
        </div>
      }
    >
      <div className="space-y-2">
        <p className="text-gray-600 line-clamp-2">{product.overview || product.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{product.location}</span>
          <span>•</span>
          <span>{product.duration}</span>
        </div>
      </div>
    </ImageCard>
  );
}
