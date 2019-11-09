import fs from "fs";
import {join} from "path";

export function readTemplate(fileName: string): string{
  return fs.readFileSync(join('src', 'creators', 'templates', fileName), 'utf8')
}