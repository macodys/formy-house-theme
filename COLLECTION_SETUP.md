# Collection Setup Guide

## Fixing the "All" Collection Issue

If you're seeing "not found" for `/collections/all`, here's how to fix it:

### Option 1: Enable the Default "All" Collection (Recommended)

1. Go to your Shopify Admin
2. Navigate to **Online Store > Navigation**
3. Check if "All Products" is in your navigation menu
4. If not, the "All" collection might be disabled. You can access it via:
   - Go to **Products > Collections**
   - Look for a collection called "All" or create one manually
   - Make sure it's set to "All products" type

### Option 2: Create a Custom "All" Collection

1. Go to **Products > Collections** in Shopify Admin
2. Click **Create collection**
3. Name it "All" or "All Products"
4. Set the collection type to **"Automated"**
5. Add condition: **Product price** is **greater than** **$0** (this will include all products)
6. Save the collection

### Option 3: Use a Different Collection

Instead of using the "All" collection, you can:
1. Create specific collections for your products (e.g., "Furniture", "Lighting", "Decor")
2. Select those collections in the theme editor for the Collection View section

## Collection View Section Usage

The Collection View section will:
- Automatically use the current collection when on a collection page
- Use the selected collection from theme settings when on other pages
- Fall back to "All" collection if no collection is selected

## Troubleshooting

- **Collection not showing products**: Make sure the collection has products assigned to it
- **"Not found" error**: Check that the collection handle matches exactly (case-sensitive)
- **Empty collection**: The section will show a message if the collection is empty

