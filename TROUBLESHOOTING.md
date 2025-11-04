# Troubleshooting Guide

## Product Page 404 Errors

If you're seeing "The page you were looking for does not exist" when clicking products:

### Solution 1: Assign the Product Template

1. Go to **Shopify Admin → Online Store → Themes**
2. Click **Customize** on your active theme
3. Go to **Product Pages** in the theme editor
4. Make sure the **Default product template** is selected
5. Save the theme

### Solution 2: Check Product Template Assignment

1. Go to **Shopify Admin → Products**
2. Click on the product that's showing 404
3. Scroll down to **Search engine listing preview**
4. Click **Edit website SEO**
5. Under **Theme templates**, make sure **Default product** is selected
6. Save

### Solution 3: Verify Template File

The product template should be located at:
- `templates/product.liquid`

Make sure this file exists and doesn't have syntax errors.

### Solution 4: Check Store Password Protection

If your store is password protected:
1. Go to **Settings → Online Store → Preferences**
2. Temporarily disable password protection to test
3. Or enter the password when accessing product pages

### Solution 5: Clear Cache

1. Go to **Online Store → Themes**
2. Click **Actions → Edit code**
3. Make a small change to any file (add a space)
4. Save to refresh the theme cache

### Solution 6: Verify Product Status

1. Go to **Products** in Shopify Admin
2. Make sure the product is:
   - **Active** (not draft)
   - **Published** to your online store
   - Has a valid **handle** (URL-friendly name)

### Common Issues

- **Schema blocks in templates**: Product templates should NOT have `{% schema %}` blocks (only sections should)
- **Template not assigned**: The theme might not be using the default product template
- **Store password**: Password-protected stores may block product pages
- **Product draft**: Products in draft mode won't be accessible

## Collection Page Issues

If collections show "not found":

1. Go to **Products → Collections**
2. Verify the collection exists and is published
3. Check the collection handle matches the URL
4. Make sure products are assigned to the collection

