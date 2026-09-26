import fs from "fs";
import path from "path";
import document from "./document";

const outputPath = path.resolve(process.cwd(), "openapi.json");

fs.writeFileSync(
  outputPath,
  JSON.stringify(document, null, 2),
  "utf-8"
);

console.log(`OpenAPI specification generated: ${outputPath}`);