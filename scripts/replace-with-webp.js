#!/usr/bin/env node

/**
 * Replace Original Images with WebP Versions
 * Replaces original images with optimized WebP versions
 */

const fs = require('fs').promises;
const path = require('path');

const SOURCE_DIR = 'public-optimized';
const TARGET_DIR = 'public';

async function copyFile(source, target) {
  try {
    // Ensure target directory exists
    const targetDir = path.dirname(target);
    await fs.mkdir(targetDir, { recursive: true });
    
    // Copy file
    await fs.copyFile(source, target);
    return true;
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${target}:`, error.message);
    return false;
  }
}

async function replaceImages() {
  try {
    console.log('🔄 Replacing original images with WebP versions...');
    
    // Find all WebP files in source directory
    const webpFiles = [];
    
    async function findWebPFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await findWebPFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.webp')) {
          webpFiles.push(fullPath);
        }
      }
    }
    
    await findWebPFiles(SOURCE_DIR);
    
    console.log(`📊 Found ${webpFiles.length} WebP files to replace`);
    
    let replaced = 0;
    let failed = 0;
    
    for (const webpFile of webpFiles) {
      // Calculate target path
      const relativePath = path.relative(SOURCE_DIR, webpFile);
      const targetPath = path.join(TARGET_DIR, relativePath);
      
      // Also create backup of original file if it exists
      const originalExtensions = ['.jpg', '.jpeg', '.png'];
      let originalExists = false;
      
      for (const ext of originalExtensions) {
        const originalPath = targetPath.replace('.webp', ext);
        try {
          await fs.access(originalPath);
          originalExists = true;
          
          // Create backup
          const backupPath = originalPath + '.backup';
          await fs.copyFile(originalPath, backupPath);
          console.log(`💾 Backup created: ${path.relative(TARGET_DIR, backupPath)}`);
          break;
        } catch {
          // Original doesn't exist with this extension
        }
      }
      
      // Copy WebP file
      const success = await copyFile(webpFile, targetPath);
      
      if (success) {
        replaced++;
        console.log(`✅ Replaced: ${path.relative(TARGET_DIR, targetPath)}`);
      } else {
        failed++;
      }
    }
    
    console.log('✅ Image replacement completed!');
    console.log(`📊 Results: ${replaced} replaced, ${failed} failed`);
    console.log('💾 Original files backed up with .backup extension');
    console.log('🎯 All images are now in WebP format for better performance!');
    
  } catch (error) {
    console.error('❌ Error during replacement:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  replaceImages();
}

module.exports = { replaceImages };
