import fs from 'fs/promises';  // Importing file system with promises
import path from 'path';        // Importing path to manage file paths

// Function to print directory contents relative to the 'public' folder
async function printDirectoryContents(dir, baseDir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relativePath = path.relative(baseDir, fullPath);  // Calculate the relative path from 'public'

      if (file.isDirectory()) {
        console.log('Directory:', relativePath);   // Log directory relative to 'public'
        // Recursively go into subdirectories
        await printDirectoryContents(fullPath, baseDir);
      } else {
        // Log file name with its extension, relative to 'public'
        console.log('File:', relativePath, `Extension: ${path.extname(file.name)}`);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Define the base directory (the 'public' folder)
const baseDir = "C:\\All codes\\html,css and js\\Portfolio";
const directoryPath = path.join(baseDir, "public");  // Starting from 'public/assets'

// Start printing from the 'public/assets' directory
printDirectoryContents(directoryPath, baseDir);
