typed-data-parser

# typed-data-parser

## Table of contents

### Classes

- [DataParserBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)
- [ParserHelperBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/ParserHelperBase.md)

### Interfaces

- [IDataParser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/interfaces/IDataParser.md)

### Type Aliases

- [GetParserByRules](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#getparserbyrules)
- [ParserRule](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)
- [ParserRulesBase](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrulesbase)

### Functions

- [DefaultGetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#defaultgetter)
- [DefaultSetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#defaultsetter)
- [EmptySetter](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#emptysetter)

## Type Aliases

### GetParserByRules

Ƭ **GetParserByRules**<`Rules`, `OriObjectType`\>: `Rules`[{ [key in keyof Rules]: Rules[key] extends Object ? key : never }[`number`]]

get parserType by original objet type

**`Example`**

```ts
// get parser type
type parserType = GetParserByRules<ParserRules,A>; // which will be AParser
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Rules` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)[] |
| `OriObjectType` | `OriObjectType` |

#### Defined in

index.ts:159

___

### ParserRule

Ƭ **ParserRule**<`OriObjectType`, `TargetDataType`, `ExDataType`, `ParserType`\>: `Object`

create a parser rule type

**`Example`**

```ts
// parse A to ATarget
type AParserRule = ParserRule<A, ATarget>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OriObjectType` | extends `Object` = `Object` |
| `TargetDataType` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |
| `ExDataType` | `any` |
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

### ParserRulesBase

Ƭ **ParserRulesBase**<`Rules`\>: `Rules`

create a parserRules which contains many parserRule

**`Example`**

```ts
// create a parserRules contains AParserRule,BParserRule and CParserRule
type ParserRules = ParserRulesBase<[AParserRule, BParserRule, CParserRule]>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Rules` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)[] |

#### Defined in

index.ts:151

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
