import * as fs from 'fs';
import { SchemaObject, SchemaObjectType, SchemaOrReferenceObject } from './Types';

const someObject = {
    "AccountId": ["string"],
    "BackupJobId": "string",
    "BackupOptions": {
        "string": "string"
    },
    "BackupSizeInBytes": 22,
    "BackupType": "string",
    "BackupVaultArn": "string",
    "BackupVaultName": "string",
    "BytesTransferred": 11,
    "CompletionDate": 22,
    "CreatedBy": [{
        "BackupPlanArn": "string",
        "BackupPlanId": "string",
        "BackupPlanVersion": "string",
        "BackupRuleId": "string"
    }],
    "CreationDate": [22],
    "ExpectedCompletionDate": 11,
    "IamRoleArn": "string",
    "PercentDone": "string",
    "RecoveryPointArn": "string",
    "ResourceArn": "string",
    "ResourceType": "string",
    "StartBy": 22,
    "State": "string",
    "StatusMessage": "string"
}

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


const getSchemaObject = (inObj: any): SchemaObject => {
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

const main = (inObj: any) => {
    const schemaObject = getSchemaObject(inObj);
    const x = 2;
}

main(someObject);