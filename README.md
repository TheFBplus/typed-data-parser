# typed-data-parser
### Install

```bash
npm i typed-data-parser
```

### ES usage:

```ts

// use import
import {
     DataParserBase, ParserHelperBase, ParserRule, ParserRulesBase
} from "typed-data-parser";

const a = new A(); // create an object
const parserA = new ParserA(A); // create a parser

let data = parserA.get(a); // get data by parser
parserA.set(a, { id: 001 }); // set data by parser

// define a parser,this parser is used to parse between object A and our target value.

// original object type
class A
{
    public id: number;
    constructor(id: number)
    {
        this.id = id;
    }
}
// target data type
interface ATarget
{
    id: number;
}

// first we must define a rule to parse between A and ATarget
type RuleA = ParserRule<A, ATarget>
// create a parser class which extends DataParserBase and input our rule
class ParserA extends DataParserBase<RuleA>
{
    // override propertyGetters to define getter function of every target property
    public override get propertyGetters()
    {
        return this.initGetters({
            id: (value: A) => value.id
        });
    }

    // override propertySetters to define setter function of every target property
    public override get propertySetters()
    {
        return this.initSetters({
            id: (value: A, targetValue: number) => { value.id = targetValue; }
        });
    }
}

// further more,we can define a parserHelper to parse multiple object types

// create a parserHelper class which extends ParserHelperBase and input an array of rules
class ParserHelper extends ParserHelperBase<[RuleA, RuleB, RuleC, ...]>{ }
// create an instance,input an array of parsers
const parserHelper = new ParserHelper([parserA, parserB, parserC, ...]);
// use this helper to parser multiple object types
parserHelper.get(a); // return object's type is ATarget 
parserHelper.get(b); // return object's type is BTarget
parserHelper.get(c); // return object's type is CTarget

```

### Node usage:

```js

// use require
const {
    addToParserHelper, DataParserBase, ParserHelperBase, ParserMap, ParserMapsBase
} = require ("typed-data-parser");

const a = new A(); // create an object
const parserA = new ParserA(A); // create a parser

let data = parserA.get(a); // get data by parser
parserA.set(a, { id: 001 }); // set data by parser

// define a parser,this parser is used to parse between object A and our target value.

// original object type
class A
{
    public id: number;
    constructor(id: number)
    {
        this.id = id;
    }
}
// target data type
interface ATarget
{
    id: number;
}

// first we must define a rule to parse between A and ATarget
type RuleA = ParserRule<A, ATarget>
// create a parser class which extends DataParserBase and input our rule
class ParserA extends DataParserBase<RuleA>
{
    // override propertyGetters to define getter function of every target property
    public override get propertyGetters()
    {
        return this.initGetters({
            id: (value: A) => value.id
        });
    }

    // override propertySetters to define setter function of every target property
    public override get propertySetters()
    {
        return this.initSetters({
            id: (value: A, targetValue: number) => { value.id = targetValue; }
        });
    }
}

// further more,we can define a parserHelper to parse multiple object types

// create a parserHelper class which extends ParserHelperBase and input an array of rules
class ParserHelper extends ParserHelperBase<[RuleA, RuleB, RuleC, ...]>{ }
// create an instance,input an array of parsers
const parserHelper = new ParserHelper([parserA, parserB, parserC, ...]);
// use this helper to parser multiple object types
parserHelper.get(a); // return object's type is ATarget 
parserHelper.get(b); // return object's type is BTarget
parserHelper.get(c); // return object's type is CTarget

```

### Static usage:

Old school method

```html
<script src="./bin/typedDataParser.js"></script>
<script>
	
const a = new A(); // create an object
const parserA = new ParserA(A); // create a parser

let data = parserA.get(a); // get data by parser
parserA.set(a, { id: 001 }); // set data by parser

// we can also define a parserHelper to parse multiple object types

// create a parserHelper class which extends ParserHelperBase and input an array of rules
class ParserHelper extends ParserHelperBase<[RuleA, RuleB, RuleC, ...]>{ }
// create an instance,input an array of parsers
const parserHelper = new ParserHelper([parserA, parserB, parserC, ...]);
// use this helper to parser multiple object types
parserHelper.get(a); // return object's type is ATarget 
parserHelper.get(b); // return object's type is BTarget
parserHelper.get(c); // return object's type is CTarget

</script>
```

For static usage, ambient type definitions can optionally be referenced here `node_modules/typed-data-parser/bin/typedDataParser.d.ts`.
### API Docs

API docs can be found [here](https://TheFBplus.github.io/typed-data-parser/)

***

### For Developer:

clone repository

```bash
git clone https://github.com/TheFBplus/typed-data-parser.git
```

init development environment

```bash
npm install
or
npm run init
```

test

```bash
npm run test
```

build

```bash
npm run build
```

build api docs

```bash
npm run docs
```