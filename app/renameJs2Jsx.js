const fs = require('fs');
const path = require('path');

const renameFiles = (dirPath) => {
	fs.readdirSync(dirPath).forEach(file => {
		const fullPath = path.join(dirPath, file);
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			renameFiles(fullPath); // Recursively rename files in subdirectories
		} else if (file.endsWith('.js')) {
			const newFilePath = fullPath.replace('.js', '.jsx');
			fs.renameSync(fullPath, newFilePath);
			console.log(`Renamed: ${fullPath} -> ${newFilePath}`);
		}
	})
}
const rootDir = "./";
renameFiles(rootDir);