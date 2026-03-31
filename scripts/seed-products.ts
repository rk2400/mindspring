/**
 * Seed Sample Products
 * Run this script to create sample candle products with real images
 * 
 * Usage: npx ts-node scripts/seed-products.ts
 */

import mongoose from 'mongoose';
import Product from '../lib/models/Product';
import { dbConfig } from '../lib/config';

const sampleProducts = [
  {
    name: 'Kindness Heart- Hand Crochet',
    description:
      'A heart for every season and any reasonBig or small, this crochet heart is a symbol of love and kindness. Perfect as a gift or a personal keepsake, it adds a handmade touch to your space.',
    price: 1499,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRc8LgLiqtOBQWnAZcVDNkT2N0JWBwWJPHQ&s'],
    status: 'active',
    stock: 25,
  },
  {
    name: 'Handmade Crochet Market Bag',
    description:
      'A stylish and sustainable market bag made with hand-crocheted cotton yarn. Perfect for grocery shopping, beach days, or everyday errands, it combines practicality with a handmade aesthetic.',
    price: 899,
    images: ['https://magicneedles.in/cdn/shop/products/Handmade-Crochet-Market-Bag-2688-1.jpg?v=1659432173'],
    status: 'active',
    stock: 30,
  },
  {
    name: 'Crochet Rose Flower',
    description:
      'A delicate crochet rose that brings a touch of handmade beauty to any space. Perfect as a decorative accent, a thoughtful gift, or a charming addition to your home decor.',
    price: 1199,
    images: ['https://pasticheak.in/cdn/shop/products/crochetrosered_1600x.jpg?v=1765862466'],
    status: 'active',
    stock: 20,
  },
  {
    name: 'Cute Flower Crochet Pot',
    description:
      'A charming crochet cover for your small plant pots. Handcrafted with love, it adds a whimsical touch to your greenery and brightens up any windowsill or desk.',
    price: 499,
    images: ['https://m.media-amazon.com/images/I/611SUHht+vL._AC_UF894,1000_QL80_.jpg'],
    status: 'active',
    stock: 40,
  },
  {
    name: 'Crochet Basket Set',
    description:
      'A set of three hand-crocheted storage baskets ideal for organizing blankets, toys, or crafting supplies. Durable and decorative for any room.',
    price: 1599,
    images: ['https://m.media-amazon.com/images/I/71cWK2MRZrL._AC_UF1000,1000_QL80_.jpg'],
    status: 'active',
    stock: 18,
  },
  {
    name: 'Pet Cozy Bed',
    description:
      'A soft, cushioned pet bed with a handmade crochet cover. Comfortable and easy to clean, it keeps your furry friend snug and secure.',
    price: 1299,
    images: ['https://i0.wp.com/eliserosecrochet.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-02-at-10.59.39-AM.png?ssl=1'],
    status: 'active',
    stock: 15,
  },
  {
    name: 'Handmade Toy Friend',
    description:
      'A charming crochet toy with personality. Perfect as a gift or keepsake, each toy is made with care and attention to detail.',
    price: 699,
    images: ['https://5.imimg.com/data5/IOS/Default/2023/1/TP/OJ/VG/182374951/product-jpeg-500x500.png'],
    status: 'active',
    stock: 28,
  },
];

async function seedProducts() {
  try {
    console.log('Using MongoDB URI:', dbConfig.uri);
    await mongoose.connect(dbConfig.uri);
    console.log('Connected to MongoDB');

    // Clear existing products (optional - comment out to keep existing)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    let created = 0;
    let updated = 0;

    for (const productData of sampleProducts) {
      const existing = await Product.findOne({ name: productData.name });
      if (existing) {
        // Update existing product
        await Product.findByIdAndUpdate(existing._id, productData);
        updated++;
        console.log(`✓ Updated: ${productData.name}`);
      } else {
        // Create new product
        await Product.create(productData);
        created++;
        console.log(`✓ Created: ${productData.name}`);
      }
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   Created: ${created} products`);
    console.log(`   Updated: ${updated} products`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

