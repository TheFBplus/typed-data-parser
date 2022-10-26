[typed-data-parser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md) / DataParserBase

# Class: DataParserBase<parserRule\>

define a parser

**`Example`**

```ts
// define a parser which parser A to ATarget
class AParser extends DataParserBase<AParserRule> { }
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `parserRule` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule) |

## Table of contents

### Constructors

- [constructor](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#constructor)

### Properties

- [oriObjectType](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#oriobjecttype)

### Accessors

- [propertyGetters](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#propertygetters)
- [propertySetters](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#propertysetters)

### Methods

- [get](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#get)
- [initGetters](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#initgetters)
- [initSetters](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#initsetters)
- [set](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#set)

## Constructors

### constructor

• **new DataParserBase**<`parserRule`\>(`oriDataType`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `parserRule` | extends [`ParserRule`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parserrule)<`Object`, `Record`<`string`, `any`\>, `any`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `oriDataType` | `ConstructorType`<`parserRule`[``"oriObjectType"``]\> |

#### Defined in

index.ts:56

## Properties

### oriObjectType

• `Readonly` **oriObjectType**: `ConstructorType`<`parserRule`[``"oriObjectType"``]\>

#### Defined in

index.ts:54

## Accessors

### propertyGetters

• `Abstract` `get` **propertyGetters**(): { [P in string \| number \| symbol]: Function }

#### Returns

{ [P in string \| number \| symbol]: Function }

#### Defined in

index.ts:61

___

### propertySetters

• `Abstract` `get` **propertySetters**(): { [P in string \| number \| symbol]: Function }

#### Returns

{ [P in string \| number \| symbol]: Function }

#### Defined in

index.ts:72

## Methods

### get

▸ **get**<`PropertyNames`\>(`value`, ...`propertyNames`): `PropertyNames` extends [] ? `parserRule`[``"targetDataType"``] : `Pick`<`parserRule`[``"targetDataType"``], `PropertyNames`[`number`]\>

get property value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropertyNames` | extends `Extract`<keyof `parserRule`[``"targetDataType"``], `string`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `parserRule`[``"oriObjectType"``] | original data |
| `...propertyNames` | `PropertyNames` | property names,can be null |

#### Returns

`PropertyNames` extends [] ? `parserRule`[``"targetDataType"``] : `Pick`<`parserRule`[``"targetDataType"``], `PropertyNames`[`number`]\>

property value

#### Defined in

index.ts:88

___

### initGetters

▸ `Protected` **initGetters**<`T`\>(`getterDescription`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends { [P in string \| number \| symbol]: Function } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getterDescription` | `T` |

#### Returns

`T`

#### Defined in

index.ts:62

___

### initSetters

▸ `Protected` **initSetters**<`T`\>(`setterDescription`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends { [P in string \| number \| symbol]: Function } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `setterDescription` | `T` |

#### Returns

`T`

#### Defined in

index.ts:73

___

### set

▸ **set**(`value`, `partialTargetData`, `extras?`): `void`

set property value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `parserRule`[``"oriObjectType"``] | original data |
| `partialTargetData` | `Partial`<`parserRule`[``"targetDataType"``]\> | propertyName-propertyValue key pairs |
| `extras?` | `Object` | extras data,which is helpful when we want to do something else after the property is been set |
| `extras.callback?` | () => `void` | - |
| `extras.exData?` | `parserRule`[``"exDataType"``] | - |

#### Returns

`void`

#### Defined in

index.ts:126
