import { Product } from '@/types/products/base-product';
import { HeroSection } from '../../ui/hero-section';
import { GradientBadge } from '../../ui/gradient-badge';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <HeroSection
      title={product.title}
      subtitle={product.subtitle}
      description={product.overview || product.description || ''}
      image={product.heroImage}
      badge={<GradientBadge>{product.type}</GradientBadge>}
    >
      <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Location:</span>
          <span className="font-medium">{product.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{product.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">₹{product.price.toLocaleString()}</span>
        </div>
      </div>
    </HeroSection>
  );
}
