import fs from 'fs';
import path from 'path';
import { yarg } from './config/plugins/args.plugin';

const { b: base, l: limit, s: showTable } = yarg;

const headerMessage = (base: number): String => {
  return `=======================================
              Tabla del ${base}\n=======================================\n\n`;
}

const multiplicationTable = (value: number) => {
  const banner = headerMessage(value);
  const outputPath = 'outputs';
  const outputs = path.join(__dirname, '../outputs', `tabla-${value}.txt`);
  let content = '';
  
  for (let i = 1; i <= limit; i++) {
    content += `${value} x ${i} = ${i * value}\n`;
  }
  if (showTable) {
    console.log(banner + content);  
  }

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFile(outputs, banner + content, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Archivo de la tabla del ${value}, ha sido creado exitosamente`);
  });
}

multiplicationTable(base);
