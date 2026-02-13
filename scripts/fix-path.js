import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = './dist';
const repoName = 'название-репозитория'; // Укажите название вашего репозитория

// Исправляем пути в HTML файлах
const fixHtmlPaths = (filePath) => {
  let content = readFileSync(filePath, 'utf8');
  
  // Заменяем /assets/ на /repoName/assets/
  content = content.replace(/href="\//g, `href="/${repoName}/`);
  content = content.replace(/src="\//g, `src="/${repoName}/`);
  
  writeFileSync(filePath, content);
  console.log(`✅ Исправлен: ${filePath}`);
};

// Исправляем пути в CSS файлах
const fixCssPaths = (filePath) => {
  let content = readFileSync(filePath, 'utf8');
  
  // Заменяем url(/images/) на url(/repoName/images/)
  content = content.replace(/url\(\//g, `url(/${repoName}/`);
  
  writeFileSync(filePath, content);
  console.log(`✅ Исправлен: ${filePath}`);
};

// Рекурсивно обходим папки
const processDirectory = (dir) => {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    
    if (existsSync(filePath)) {
      if (file.endsWith('.html')) {
        fixHtmlPaths(filePath);
      } else if (file.endsWith('.css')) {
        fixCssPaths(filePath);
      } else if (file.endsWith('.js') && file.includes('index-')) {
        // Для JS файлов тоже можно исправить, если там есть пути
        let content = readFileSync(filePath, 'utf8');
        content = content.replace(/from "\/assets/g, `from "/${repoName}/assets`);
        writeFileSync(filePath, content);
        console.log(`✅ Исправлен JS: ${filePath}`);
      }
    }
  });
};

if (existsSync(distDir)) {
  processDirectory(distDir);
  console.log('🎉 Все пути исправлены!');
} else {
  console.error('❌ Папка dist не найдена. Сначала выполните npm run build');
}