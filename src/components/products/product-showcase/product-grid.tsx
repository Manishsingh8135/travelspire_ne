import { Product } from '@/types/products/base-product';
import { ProductCard } from './product-card';
import { GridLayout } from '../../ui/grid-layout';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <GridLayout>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridLayout>
  );
}
