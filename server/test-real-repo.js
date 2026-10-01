import path from 'path';
import { fileURLToPath } from 'url';
import { getRepositorySnapshot } from './src/services/repository.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const result = await getRepositorySnapshot(__dirname); // Scan the 'server' directory itself
  
  console.log(`Analyzed repository: ${result.root}`);
  console.log(`Total files: ${result.fileCount}`);
  console.log(`Total entities extracted: ${result.entities.length}`);
  
  // Show 5 sample entities
  console.log("\n--- Sample Entities ---");
  console.log(JSON.stringify(result.entities.slice(0, 5), null, 2));
}

main().catch(console.error);
