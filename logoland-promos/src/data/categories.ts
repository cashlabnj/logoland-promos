import { products } from "./products";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
  imageUrl: string;
}

export const categories: Category[] = [
  {
    id: "apparel",
    name: "Apparel",
    slug: "apparel",
    description: "Premium branded clothing items including t-shirts, polos, hoodies, caps, and more.",
    icon: "ShirtIcon",
    productCount: 0,
    imageUrl: "/images/categories/apparel.svg",
  },
  {
    id: "drinkware",
    name: "Drinkware",
    slug: "drinkware",
    description: "Insulated water bottles, tumblers, and lunch boxes to keep beverages and food at ideal temperatures.",
    icon: "GlassWater",
    productCount: 0,
    imageUrl: "/images/categories/drinkware.svg",
  },
  {
    id: "tech",
    name: "Tech",
    slug: "tech",
    description: "Technology accessories including power banks, USB drives, cables, earbuds, and more.",
    icon: "Cpu",
    productCount: 0,
    imageUrl: "/images/categories/tech.svg",
  },
  {
    id: "bags",
    name: "Bags",
    slug: "bags",
    description: "Durable bags for every occasion including tote bags, backpacks, and drawstring packs.",
    icon: "Backpack",
    productCount: 0,
    imageUrl: "/images/categories/bags.svg",
  },
  {
    id: "writing",
    name: "Writing",
    slug: "writing",
    description: "Premium writing instruments and stationery items for professional and personal use.",
    icon: "PenTool",
    productCount: 0,
    imageUrl: "/images/categories/writing.svg",
  },
  {
    id: "office",
    name: "Office",
    slug: "office",
    description: "Essential office supplies and desk accessories to enhance productivity and workspace.",
    icon: "Briefcase",
    productCount: 0,
    imageUrl: "/images/categories/office.svg",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    slug: "outdoor",
    description: "Outdoor gear including umbrellas, sunglasses, blankets, and other outdoor essentials.",
    icon: "Sun",
    productCount: 0,
    imageUrl: "/images/categories/outdoor.svg",
  },
  {
    id: "wellness",
    name: "Wellness",
    slug: "wellness",
    description: "Health and wellness products including sanitizers, lip balm, yoga mats, and stress relief items.",
    icon: "Heart",
    productCount: 0,
    imageUrl: "/images/categories/wellness.svg",
  },
];

// Calculate product counts dynamically
export function getCategoriesWithCounts(): Category[] {
  return categories.map((category) => ({
    ...category,
    productCount: products.filter(
      (product) => product.category === category.name
    ).length,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categoryWithCount = getCategoriesWithCounts().find(
    (cat) => cat.slug === slug
  );
  return categoryWithCount;
}

export function getAllCategories(): Category[] {
  return getCategoriesWithCounts();
}
