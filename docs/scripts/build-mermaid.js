#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src/mermaid');
const OUT_DIR = path.join(__dirname, '../public/mermaid');
const CONFIG = path.join(__dirname, '../mermaid.config.json');

// Configuracoes de saida
const OUTPUT_FORMAT = 'png';
const SCALE = 3;  // Alta resolucao (3x)
const WIDTH = 2400;  // Largura maxima em pixels

function findMermaidFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMermaidFiles(fullPath, files);
    } else if (entry.name.endsWith('.mmd')) {
      files.push(fullPath);
    }
  }
  return files;
}

function buildDiagram(inputPath) {
  const relativePath = path.relative(SRC_DIR, inputPath);
  const outputPath = path.join(
    OUT_DIR,
    relativePath.replace('.mmd', `.${OUTPUT_FORMAT}`)
  );

  // Criar diretorio de saida
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  console.log(`  Building: ${relativePath}`);

  try {
    execSync(
      `npx mmdc -i "${inputPath}" -o "${outputPath}" -c "${CONFIG}" -s ${SCALE} -w ${WIDTH} -b white`,
      { stdio: 'pipe' }
    );
    console.log(`  ✓ Created: ${path.relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error(`  ✗ Error building ${relativePath}:`, error.message);
    process.exit(1);
  }
}

// Executar
console.log('');
console.log('🔨 Building Mermaid diagrams...');
console.log('');

if (!fs.existsSync(SRC_DIR)) {
  console.log(`Creating source directory: ${SRC_DIR}`);
  fs.mkdirSync(SRC_DIR, { recursive: true });
}

const files = findMermaidFiles(SRC_DIR);

if (files.length === 0) {
  console.log('  No .mmd files found in src/mermaid/');
  console.log('  Skipping mermaid build.');
  console.log('');
  process.exit(0);
}

console.log(`  Found ${files.length} diagram(s) to build:`);
console.log('');

files.forEach(buildDiagram);

console.log('');
console.log(`✅ Built ${files.length} diagram(s) successfully`);
console.log('');
