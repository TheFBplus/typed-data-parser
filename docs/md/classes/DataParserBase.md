[typed-data-parser](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md) / DataParserBase

# Class: DataParserBase<parserMap\>

define a parser

**`Example`**

```ts
// define a parser which parser A to ATarget
class AParser extends DataParserBase<AParserMap> { }
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `parserMap` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap) |

## Table of contents

### Constructors

- [constructor](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md#constructor)

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

• **new DataParserBase**<`parserMap`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `parserMap` | extends [`ParserMap`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/README.md#parsermap)<`Object`, `Record`<`string`, `any`\>, `unknown`, [`DataParserBase`](https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/classes/DataParserBase.md)<`any`\>\> |

## Accessors

### propertyGetters

• `Abstract` `get` **propertyGetters**(): { [P in string \| number \| symbol]: Function }

#### Returns

{ [P in string \| number \| symbol]: Function }

#### Defined in

index.ts:54

___

### propertySetters

• `Abstract` `get` **propertySetters**(): { [P in string \| number \| symbol]: Function }

#### Returns

{ [P in string \| number \| symbol]: Function }

#### Defined in

index.ts:65

## Methods

### get

▸ **get**<`PropertyNames`\>(`value`, ...`propertyNames`): `PropertyNames` extends [] ? `parserMap`[``"targetDataType"``] : `Pick`<`parserMap`[``"targetDataType"``], `PropertyNames`[`number`]\>

get property value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropertyNames` | extends `Extract`<keyof `parserMap`[``"targetDataType"``], `string`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `parserMap`[``"oriObjectType"``] | original data |
| `...propertyNames` | `PropertyNames` | property names,can be null |

#### Returns

`PropertyNames` extends [] ? `parserMap`[``"targetDataType"``] : `Pick`<`parserMap`[``"targetDataType"``], `PropertyNames`[`number`]\>

property value

#### Defined in

index.ts:81

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

index.ts:55

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

index.ts:66

___

### set

▸ **set**(`value`, `partialTargetData`, `extras?`): `void`

set property value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `parserMap`[``"oriObjectType"``] | original data |
| `partialTargetData` | `Partial`<`parserMap`[``"targetDataType"``]\> | propertyName-propertyValue key pairs |
| `extras?` | `Object` | extras data,which is helpful when we want to do something else after the property is been set |
| `extras.callback?` | () => `void` | - |
| `extras.exData?` | `parserMap`[``"exDataType"``] | - |

#### Returns

`void`

#### Defined in

index.ts:119
