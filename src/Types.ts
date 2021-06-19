export const enum SchemaObjectType {
    object = 'object',
    array = 'array',
    string = 'string',
    number = 'number',
    integer = 'integer',
    boolean = 'boolean'
}

export const enum StringFormatType {
    date,
    dateTime,
    url,
    email
}

export type ReferenceObject = {
    ref: string
}

export type SchemaObject = {
    schemaName?: string
    type?: SchemaObjectType,
    description?: string,
    properties?: Record<string, SchemaObject>
}

export type SchemaOrReferenceObject = SchemaObject | ReferenceObject;