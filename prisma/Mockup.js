const prisma = require('../config/prisma');

const categoryData = [
    { name: 'Appetizers' },
    { name: 'Main Courses' },
    { name: 'Desserts' },
    { name: 'Beverages' },
];

const menuItemData = [
    // Appetizers
    { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: 80, imageUrl: 'https://example.com/samosa.jpg', categoryId: 1 },
    { name: 'Pakora', description: 'Assorted vegetable fritters', price: 70, imageUrl: 'https://example.com/pakora.jpg', categoryId: 1 },
    { name: 'Paneer Tikka', description: 'Grilled cottage cheese marinated in spices', price: 120, imageUrl: 'https://example.com/paneer-tikka.jpg', categoryId: 1 },
    { name: 'Chicken 65', description: 'Spicy deep-fried chicken', price: 140, imageUrl: 'https://example.com/chicken-65.jpg', categoryId: 1 },
    { name: 'Aloo Tikki', description: 'Crispy potato patties served with chutneys', price: 90, imageUrl: 'https://example.com/aloo-tikki.jpg', categoryId: 1 },
    { name: 'Onion Bhaji', description: 'Crispy onion fritters', price: 75, imageUrl: 'https://example.com/onion-bhaji.jpg', categoryId: 1 },
    { name: 'Papdi Chaat', description: 'Crispy dough wafers with chickpeas, potatoes, and chutneys', price: 100, imageUrl: 'https://example.com/papdi-chaat.jpg', categoryId: 1 },
    { name: 'Vegetable Seekh Kebab', description: 'Grilled vegetable skewers', price: 110, imageUrl: 'https://example.com/veg-seekh-kebab.jpg', categoryId: 1 },
    { name: 'Dahi Puri', description: 'Hollow crispy puris filled with yogurt and chutneys', price: 95, imageUrl: 'https://example.com/dahi-puri.jpg', categoryId: 1 },
    { name: 'Stuffed Mushrooms', description: 'Mushrooms stuffed with spiced paneer', price: 130, imageUrl: 'https://example.com/stuffed-mushrooms.jpg', categoryId: 1 },

    // Main Courses
    { name: 'Butter Chicken', description: 'Tender chicken in a rich tomato and butter sauce', price: 220, imageUrl: 'https://example.com/butter-chicken.jpg', categoryId: 2 },
    { name: 'Palak Paneer', description: 'Cottage cheese cubes in a creamy spinach sauce', price: 180, imageUrl: 'https://example.com/palak-paneer.jpg', categoryId: 2 },
    { name: 'Chicken Biryani', description: 'Fragrant rice dish with chicken and spices', price: 200, imageUrl: 'https://example.com/chicken-biryani.jpg', categoryId: 2 },
    { name: 'Dal Makhani', description: 'Creamy black lentils', price: 150, imageUrl: 'https://example.com/dal-makhani.jpg', categoryId: 2 },
    { name: 'Rogan Josh', description: 'Aromatic lamb curry', price: 240, imageUrl: 'https://example.com/rogan-josh.jpg', categoryId: 2 },
    { name: 'Vegetable Korma', description: 'Mixed vegetables in a mild, creamy sauce', price: 170, imageUrl: 'https://example.com/veg-korma.jpg', categoryId: 2 },
    { name: 'Chana Masala', description: 'Spiced chickpea curry', price: 160, imageUrl: 'https://example.com/chana-masala.jpg', categoryId: 2 },
    { name: 'Fish Curry', description: 'Fish cooked in a tangy coconut curry', price: 230, imageUrl: 'https://example.com/fish-curry.jpg', categoryId: 2 },
    { name: 'Malai Kofta', description: 'Fried dumplings in a rich tomato gravy', price: 190, imageUrl: 'https://example.com/malai-kofta.jpg', categoryId: 2 },
    { name: 'Tandoori Chicken', description: 'Yogurt and spice marinated chicken', price: 210, imageUrl: 'https://example.com/tandoori-chicken.jpg', categoryId: 2 },

    // Desserts
    { name: 'Gulab Jamun', description: 'Deep-fried milk solids soaked in sugar syrup', price: 80, imageUrl: 'https://example.com/gulab-jamun.jpg', categoryId: 3 },
    { name: 'Rasmalai', description: 'Soft cottage cheese dumplings in sweet milk', price: 90, imageUrl: 'https://example.com/rasmalai.jpg', categoryId: 3 },
    { name: 'Kheer', description: 'Rice pudding with nuts', price: 70, imageUrl: 'https://example.com/kheer.jpg', categoryId: 3 },
    { name: 'Gajar Ka Halwa', description: 'Carrot pudding with nuts', price: 85, imageUrl: 'https://example.com/gajar-halwa.jpg', categoryId: 3 },
    { name: 'Jalebi', description: 'Deep-fried pretzel shapes soaked in sugar syrup', price: 75, imageUrl: 'https://example.com/jalebi.jpg', categoryId: 3 },
    { name: 'Kulfi', description: 'Indian ice cream', price: 95, imageUrl: 'https://example.com/kulfi.jpg', categoryId: 3 },
    { name: 'Rasgulla', description: 'Soft cheese balls in sugar syrup', price: 80, imageUrl: 'https://example.com/rasgulla.jpg', categoryId: 3 },
    { name: 'Ras Malai', description: 'Cheese patties soaked in sweetened, thickened milk', price: 100, imageUrl: 'https://example.com/ras-malai.jpg', categoryId: 3 },
    { name: 'Shahi Tukda', description: 'Bread pudding with nuts and cream', price: 110, imageUrl: 'https://example.com/shahi-tukda.jpg', categoryId: 3 },
    { name: 'Phirni', description: 'Ground rice pudding', price: 85, imageUrl: 'https://example.com/phirni.jpg', categoryId: 3 },

    // Beverages
    { name: 'Mango Lassi', description: 'Yogurt-based mango drink', price: 70, imageUrl: 'https://example.com/mango-lassi.jpg', categoryId: 4 },
    { name: 'Masala Chai', description: 'Spiced Indian tea', price: 50, imageUrl: 'https://example.com/masala-chai.jpg', categoryId: 4 },
    { name: 'Sweet Lassi', description: 'Sweet yogurt drink', price: 65, imageUrl: 'https://example.com/sweet-lassi.jpg', categoryId: 4 },
    { name: 'Nimbu Pani', description: 'Fresh lime water', price: 45, imageUrl: 'https://example.com/nimbu-pani.jpg', categoryId: 4 },
    { name: 'Badam Milk', description: 'Almond flavored milk', price: 75, imageUrl: 'https://example.com/badam-milk.jpg', categoryId: 4 },
    { name: 'Thandai', description: 'Spiced milk drink', price: 80, imageUrl: 'https://example.com/thandai.jpg', categoryId: 4 },
    { name: 'Jaljeera', description: 'Cumin flavored refreshing drink', price: 55, imageUrl: 'https://example.com/jaljeera.jpg', categoryId: 4 },
    { name: 'Aam Panna', description: 'Raw mango drink', price: 60, imageUrl: 'https://example.com/aam-panna.jpg', categoryId: 4 },
    { name: 'Rose Milk', description: 'Chilled rose flavored milk', price: 70, imageUrl: 'https://example.com/rose-milk.jpg', categoryId: 4 },
    { name: 'Fresh Coconut Water', description: 'Chilled coconut water', price: 65, imageUrl: 'https://example.com/coconut-water.jpg', categoryId: 4 },
];

const tableData = [
    { capacity: '4' },
    { capacity: '4' },
    { capacity: '4' },
    { capacity: '4' },
    { capacity: '4' },
    { capacity: '6' },
    { capacity: '6' },
    { capacity: '8' },
    { capacity: '8' },
    { capacity: '10' },
];

console.log('Seeding Indian restaurant menu data...');

async function run() {
    // First, create categories
    await prisma.category.createMany({ data: categoryData });
    
    // Then, create menu items
    await prisma.menuItem.createMany({ data: menuItemData });

    // Finally, create tables
    await prisma.table.createMany({ data: tableData });

}

run()