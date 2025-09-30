import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'src/content/blog');

export function getPosts() {
  const fileNames = fs.readdirSync(blogDir);
  return fileNames.map(fileName => {
    const filePath = path.join(blogDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: fileName.replace('.md', ''),
      ...data,
    };
  });
}