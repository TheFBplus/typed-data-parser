typed-data-parser

# typed-data-parser

## Table of contents

### Classes

- [DataParserBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)
- [ParserHelperBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md)

### Interfaces

- [IDataParser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/interfaces/IDataParser.md)

### Type Aliases

- [GetParserByMaps](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbymaps)
- [MapInstanceType](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#mapinstancetype)
- [ParserMap](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)
- [ParserMapsBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermapsbase)

### Functions

- [DefaultGetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#defaultgetter)
- [DefaultSetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#defaultsetter)
- [EmptySetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#emptysetter)
- [addToParserHelper](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#addtoparserhelper)

## Type Aliases

### GetParserByMaps

Ƭ **GetParserByMaps**<`Maps`, `OriObjectType`\>: `Maps`[{ [key in keyof Maps]: Maps[key] extends Object ? key : never }[`number`]]

get parserType by original objet type

**`Example`**

```ts
// get parser type
type parserType = GetParserByMaps<ParserMaps,A>; // which will be AParser
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Maps` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)[] |
| `OriObjectType` | `OriObjectType` |

#### Defined in

index.ts:157

___

### MapInstanceType

Ƭ **MapInstanceType**<`Map`\>: `Object`

this type is used to registe parserHelper

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Map` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `oriObjectType` | `ConstructorType`<`Map`[``"oriObjectType"``]\> |
| `parser` | `Map`[``"parserType"``] |

#### Defined in

index.ts:139

___

### ParserMap

Ƭ **ParserMap**<`OriObjectType`, `TargetDataType`, `ExDataType`, `ParserType`\>: `Object`

create a parsermap type

**`Example`**

```ts
// parse A to ATarget
type AParserMap = ParserMap<A, ATarget>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OriObjectType` | extends `Object` = `Object` |
| `TargetDataType` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |
| `ExDataType` | `unknown` |
| `ParserType` | extends [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\> = [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `exDataType?` | `ExDataType` |
| `oriObjectType` | `OriObjectType` |
| `parserType` | `ConstructorType`<`ParserType`\> |
| `targetDataType` | `TargetDataType` |

#### Defined in

index.ts:7

___

### ParserMapsBase

Ƭ **ParserMapsBase**<`Maps`\>: `Maps`

create a parserMaps which contains many parserMap

**`Example`**

```ts
// create a parserMaps contains AParserMap,BParserMap and CParserMap
type ParserMaps = ParserMapsBase<[AParserMap, BParserMap, CParserMap]>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Maps` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)[] |

#### Defined in

index.ts:149

## Functions

### DefaultGetter

▸ **DefaultGetter**(`value`, `propertyName`): `any`

default getter,get property directly

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `object` | original data |
| `propertyName` | `string` | the propertyName |

#### Returns

`any`

value[propertyName]

#### Defined in

index.ts:29

___

### DefaultSetter

▸ **DefaultSetter**(`value`, `targetValue`, `propertyName?`, `exData?`): `void`

default setter,set property directly

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `object` | original data |
| `targetValue` | `unknown` | target value |
| `propertyName?` | `string` | the propertyName |
| `exData?` | `unknown` | extras data,which is helpful when we want to do something else after the property is been set |

#### Returns

`void`

#### Defined in

index.ts:37

___

### EmptySetter

▸ **EmptySetter**(...`args`): `void`

do nothing,which is helpful is we want this property to be readonly

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `unknown`[] | any arguments |

#### Returns

`void`

#### Defined in

index.ts:42

___

### addToParserHelper

▸ **addToParserHelper**<`OriObjectType`\>(`oriObjectType`): (`target`: `ConstructorType`<[`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<[`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)<`OriObjectType`, `Record`<`string`, `any`\>, `unknown`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>\>\>) => `void`

add parser to parser helper so the helper can select the parser by input value type

#### Type parameters

| Name |
| :------ |
| `OriObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oriObjectType` | `ConstructorType`<`OriObjectType`\> | original object type |

#### Returns

`fn`

▸ (`target`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `ConstructorType`<[`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<[`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)<`OriObjectType`, `Record`<`string`, `any`\>, `unknown`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\>\>\> |

##### Returns

`void`

#### Defined in

index.ts:167
