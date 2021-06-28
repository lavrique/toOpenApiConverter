import * as fs from 'fs';
import { Options, SchemaObject, SchemaObjectType, SchemaOrReferenceObject } from './Types';

const getPropertiesFromObj = (
    obj: Record<string, any>): Record<string, SchemaObject> => {
    const properties: Record<string, SchemaObject> = {};
    Object.keys(obj).forEach(key => {
        properties[key] = getSchemaObject(obj[key]);
    })
    return properties;
}

const handleArrayAndObject = (inObj: any): SchemaObject => {
    if (typeof inObj === 'object' && Array.isArray(inObj)) {
        if (inObj.length === 0) {
            throw new Error(`Array has length 0`)
        }
        return {
            type: SchemaObjectType.array,
            itemType: getSchemaObject(inObj[0])
        }
    }
    return {
        type: SchemaObjectType.object,
        properties: { ...getPropertiesFromObj(inObj) }
    }
}


export const getSchemaObject = (inObj: any): SchemaObject => {
    switch (typeof inObj) {
        case 'object': return handleArrayAndObject(inObj)
        case 'string': {
            //TODO handle formats
            //TODO handle where key is a string {[key: string]: obj}
            return {
                type: SchemaObjectType.string,
            }
        }
        case 'boolean': return {
            type: SchemaObjectType.boolean,
        }
        case 'number': return {
            type: SchemaObjectType.number,
        }
        default:
            throw new Error(`Did not find type for ${inObj}`);
    }
}

const tab = (noOfTabs?: number): string => {
    if (noOfTabs === undefined) return '  ';
    let stringToReturn = '';
    for (let i = 0; i < noOfTabs; i++) stringToReturn += '  ';
    return stringToReturn;
}

const toLowerCamelCase = (str: string): string => {
    return str.replace(/[-|\.|\/| |_][a-z|A-Z]/g, match => `${match[1]}`.toUpperCase())
        .replace(/^[A-Z]/, match => `${match}`.toLowerCase())
}

const writeProperties = (properties: Record<string, SchemaObject>, startTab: number = 2, options: Options): string => {
    console.log(`Properties: ${startTab}`);
    let strToReturn: string = '';
    Object.keys(properties).forEach(key => {
        const keyName = options.keepOriginal
            ? key
            : toLowerCamelCase(key)
        strToReturn += `${tab(startTab)}${keyName}:\n`
        strToReturn += writeSchemaObject(properties[key], (startTab + 1), options);
    });
    return strToReturn;
}

/**
 * This function is created separately because it is used in recursion
 * @param schemaObject 
 * @param startTab where the tabbing should start, since it is recursion it will have another tab for each time this function is called
 */
const writeSchemaObject = (schemaObject: SchemaObject, startTab: number = 1, options: Options): string => {
    let strToReturn: string = '';
    console.log(`schemaObjet: ${startTab}`);
    switch (schemaObject.type) {
        case SchemaObjectType.array: {
            // debugger
            strToReturn += `${tab(startTab)}type: array\n`;
            strToReturn += `${tab(startTab)}items:\n`;
            strToReturn += writeSchemaObject(schemaObject.itemType!, startTab + 1, options)
        } break;
        case SchemaObjectType.object: {
            strToReturn += `${tab(startTab)}type: object\n`;
            strToReturn += `${tab(startTab)}properties:\n`;
            strToReturn += writeProperties(
                <Record<string, SchemaObject>>schemaObject.properties,
                (startTab + 1),
                options
            );
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.integer: {
            strToReturn += `${tab(startTab)}type: integer\n`
        } break;
        case SchemaObjectType.number: {
            strToReturn += `${tab(startTab)}type: number\n`
        } break;
        case SchemaObjectType.string: {
            strToReturn += `${tab(startTab)}type: string\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        case SchemaObjectType.boolean: {
            strToReturn += `${tab(startTab)}type: boolean\n`
        } break;
        default:
            throw new Error(`Type ${schemaObject.type} is not handled for writing the yml file`);
    }
    return strToReturn;
}

export const schemaObjectToTextString = (schemaObject: SchemaObject, options: Options): string => {
    let strToReturn = 'schemaObjectName:\n';
    return strToReturn += writeSchemaObject(schemaObject, undefined, options);
}

const main = (inObj: any) => {
    const schemaObject = getSchemaObject(inObj);
    const x = 2;
}

// main(someObject);