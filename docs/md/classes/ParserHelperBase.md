[typed-data-parser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md) / ParserHelperBase

# Class: ParserHelperBase<Maps\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Maps` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)[] |

## Table of contents

### Constructors

- [constructor](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#constructor)

### Properties

- [parserCreated](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#parsercreated)
- [parserMaps](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#parsermaps)

### Methods

- [get](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#get)
- [getParser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#getparser)
- [set](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#set)
- [registerMap](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md#registermap)

## Constructors

### constructor

• **new ParserHelperBase**<`Maps`\>(`maps?`)

Creates an instance of parser helper base.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Maps` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)<`Object`, `Record`<`string`, `any`\>, `unknown`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `maps?` | [`MapInstanceType`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#mapinstancetype)<`Maps`[`number`]\>[] |

#### Defined in

index.ts:191

## Properties

### parserCreated

• `Protected` **parserCreated**: `Map`<`ConstructorType`<[`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>

the parser created,use to cache

#### Defined in

index.ts:184

___

### parserMaps

▪ `Static` `Protected` **parserMaps**: `Map`<`Object`, `Set`<`ConstructorType`<[`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>\>\>

parser map that is registed to the helper

#### Defined in

index.ts:180

## Methods

### get

▸ **get**<`T`, `U`\>(`value`, ...`propertyNames`): `U` extends [] ? `TargetDataType`<`Maps`, `T`\> : `Pick`<`TargetDataType`<`Maps`, `T`\>, `U`[`number`]\>

get data from parser

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `U` | extends `Extract`<keyof `TargetDataType`<`Maps`, `T`\>, `string`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | input value |
| `...propertyNames` | `U` | property names,can be null |

#### Returns

`U` extends [] ? `TargetDataType`<`Maps`, `T`\> : `Pick`<`TargetDataType`<`Maps`, `T`\>, `U`[`number`]\>

data matched propertyNames

#### Defined in

index.ts:265

___

### getParser

▸ **getParser**<`T`, `U`\>(`value`, `parserType?`): `U` extends `undefined` ? `InstanceType`<[`GetParserByMaps`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbymaps)<`Maps`, `T`\>[``"parserType"``]\> : `Extract`<`InstanceType`<[`GetParserByMaps`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbymaps)<`Maps`, `T`\>[``"parserType"``]\>, `U`\>

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

`U` extends `undefined` ? `InstanceType`<[`GetParserByMaps`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbymaps)<`Maps`, `T`\>[``"parserType"``]\> : `Extract`<`InstanceType`<[`GetParserByMaps`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbymaps)<`Maps`, `T`\>[``"parserType"``]\>, `U`\>

matched parser

#### Defined in

index.ts:220

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
| `partialTargetData` | `Partial`<`TargetDataType`<`Maps`, `T`\>\> | propertyName-propertyValue key pairs |
| `extras?` | `Object` | extras data,which is helpful when we want to do something else after the property is been set |
| `extras.callback?` | () => `void` | - |
| `extras.exData?` | `any` | - |

#### Returns

`void`

#### Defined in

index.ts:283

___

### registerMap

▸ `Static` **registerMap**(`map`): `void`

add parser map to helper to registe

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | [`MapInstanceType`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#mapinstancetype)<`any`\> | parser map to add |

#### Returns

`void`

#### Defined in

index.ts:203
