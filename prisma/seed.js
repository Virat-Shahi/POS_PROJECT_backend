const prisma = require('../config/prisma');

const categoryData = [
    { name: 'Appetizers' },
    { name: 'Main Courses' },
    { name: 'Desserts' },
    { name: 'Beverages' },
    { name: 'Breads' },
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
    { capacity: '10' },
    { capacity: '10' },
];

console.log('Seeding Indian restaurant menu data...');

async function run() {
    // First, create categories
    await prisma.category.createMany({ data: categoryData });
    
    // Then, create menu items
    // await prisma.menuItem.createMany({ data: menuItemData });

    // Finally, create tables
    await prisma.table.createMany({ data: tableData });

}

run()