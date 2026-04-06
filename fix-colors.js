const fs = require('fs');
const path = require('path');
const dirs = [
  path.join(process.cwd(), 'components/scenes'),
  path.join(process.cwd(), 'components/ui')
];

function mapAlphaToVar(alphaStr) {
  let alpha = parseFloat('0.' + alphaStr);
  if (alpha >= 0.85) return '--text-90';
  if (alpha >= 0.70) return '--text-75';
  if (alpha >= 0.58) return '--text-60';
  if (alpha >= 0.50) return '--text-55';
  if (alpha >= 0.40) return '--text-45';
  if (alpha >= 0.30) return '--text-35';
  if (alpha >= 0.22) return '--text-25';
  if (alpha >= 0.17) return '--text-20';
  return '--text-15';
}

function processFile(file) {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
  let text = fs.readFileSync(file, 'utf8');
  let originalText = text;

  text = text.replace(/'#ffffff'/gi, \"'var(--text)'\");
  text = text.replace(/'#fff'/gi, \"'var(--text)'\");
  
  text = text.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.([0-9]+)\s*\)/g, (match, p1) => {
    return 'var(' + mapAlphaToVar(p1) + ')';
  });

  text = text.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*1(?:\.0+)?\s*\)/g, 'var(--text)');

  if (text !== originalText) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('Fixed:', path.basename(file));
  }
}

dirs.forEach(dir => {
  if(fs.existsSync(dir)){
    fs.readdirSync(dir).forEach(f => {
      let fullPath = path.join(dir, f);
      if(fs.statSync(fullPath).isFile()) processFile(fullPath);
    });
  }
});
console.log('Color replacement done.');
