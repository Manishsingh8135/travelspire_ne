import { Product } from '@/types/products/base-product';
import { GradientCard } from '../ui/gradient-card';
import { GridLayout } from '../ui/grid-layout';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Experiences</h2>
        <GridLayout>
          {featuredProducts.map((product) => (
            <GradientCard
              key={product.id}
              title={product.title}
              description={product.description || ''}
              image={product.heroImage}
              link={`/products/${product.slug}`}
              badge={product.type}
              price={product.price}
            />
          ))}
        </GridLayout>
      </div>
    </section>
  );
}
