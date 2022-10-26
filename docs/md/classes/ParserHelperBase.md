[typed-data-parser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md) / ParserHelperBase

# Class: ParserHelperBase<Rules\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Rules` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)[] |

## Table of contents

### Constructors

- [constructor](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#constructor)

### Properties

- [parserRules](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#parserrules)

### Methods

- [get](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#get)
- [getParser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#getparser)
- [set](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#set)

## Constructors

### constructor

• **new ParserHelperBase**<`Rules`\>(`parsers?`)

Creates an instance of parser helper base.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Rules` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)<`Object`, `Record`<`string`, `any`\>, `any`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsers?` | `InstanceType`<`Rules`[`number`][``"parserType"``]\>[] |

#### Defined in

index.ts:177

## Properties

### parserRules

• `Protected` **parserRules**: `Map`<`Object`, `Set`<[`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>\>

parser rules that is registed to the helper

#### Defined in

index.ts:171

## Methods

### get

▸ **get**<`T`, `U`\>(`value`, ...`propertyNames`): `U` extends [] ? `TargetDataType`<`Rules`, `T`\> : `Pick`<`TargetDataType`<`Rules`, `T`\>, `U`[`number`]\>

get data from parser

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `U` | extends `Extract`<keyof `TargetDataType`<`Rules`, `T`\>, `string`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | input value |
| `...propertyNames` | `U` | property names,can be null |

#### Returns

`U` extends [] ? `TargetDataType`<`Rules`, `T`\> : `Pick`<`TargetDataType`<`Rules`, `T`\>, `U`[`number`]\>

data matched propertyNames

#### Defined in

index.ts:222

___

### getParser

▸ **getParser**<`T`, `U`\>(`value`, `parserType?`): `U` extends `undefined` ? `InstanceType`<[`GetParserByRules`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbyrules)<`Rules`, `T`\>[``"parserType"``]\> : `Extract`<`InstanceType`<[`GetParserByRules`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbyrules)<`Rules`, `T`\>[``"parserType"``]\>, `U`\>

get parser by input value type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `U` | extends [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`, `U`\> = `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | input value |
| `parserType?` | `ConstructorType`<`U`\> | can set parserType manually |

#### Returns

`U` extends `undefined` ? `InstanceType`<[`GetParserByRules`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbyrules)<`Rules`, `T`\>[``"parserType"``]\> : `Extract`<`InstanceType`<[`GetParserByRules`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbyrules)<`Rules`, `T`\>[``"parserType"``]\>, `U`\>

matched parser

#### Defined in

index.ts:197

___

### set

▸ **set**<`T`\>(`value`, `partialTargetData`, `extras?`): `void`

set data by parser

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | input value |
| `partialTargetData` | `Partial`<`TargetDataType`<`Rules`, `T`\>\> | propertyName-propertyValue key pairs |
| `extras?` | `Object` | extras data,which is helpful when we want to do something else after the property is been set |
| `extras.callback?` | () => `void` | - |
| `extras.exData?` | `any` | - |

#### Returns

`void`

#### Defined in

index.ts:234
