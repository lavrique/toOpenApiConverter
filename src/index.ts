
export * from './utils';
export * from './Types';

import * as fs from 'fs';
import { getSchemaObject, schemaObjectToTextString } from './utils';
import { obj } from './test/resources/Object';
const schemaObject = getSchemaObject(obj);
const schemaString = schemaObjectToTextString(schemaObject);
fs.writeFileSync('test.yml', schemaString);
const p = 2;