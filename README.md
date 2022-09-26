# typed-data-parser
### Install

```bash
npm i typed-data-parser
```

### ES usage:

```ts

// use import
import {
    addToParserHelper, DataParserBase, ParserHelperBase, ParserMap, ParserMapsBase
} from "typed-data-parser";

// class Human 
class Human
{
    /**
     * IQ  of human
     */
    public IQ: number;
    /**
     * Salary  of human
     */
    public salary: number;
    constructor(IQ: number, salary: number)
    {
        this.IQ = IQ;
        this.salary = salary;
    }
}

// target data 
interface HumanEvaluation
{
    mind: "stupid" | "normal" | "smart";
    wealth: "poor" | "medium" | "rich";
}

// create parser map type
type HumanParserMap = ParserMap<Human, HumanEvaluation>;

// create parser to parse Human to HumanEvaluation
@addToParserHelper(Human) // we must register parserMap to parserHelper so we can get the correct parser!
class HumanParser extends DataParserBase<HumanParserMap>{

    // fullfill propertyGetters
    public override get propertyGetters()
    {
        return this.initGetters({
            // set mind according to this human's IQ
            mind: (human) =>
            {
                if (human.IQ > 120) { return "smart"; }
                if (human.IQ > 90) { return "normal"; }
                else { return "stupid"; }
            },
            // set wealth according to this human's salary
            wealth: (human) =>
            {
                if (human.salary > 30000) { return "rich"; }
                if (human.salary > 10000) { return "medium"; }
                else { return "poor"; }
            },
        });
    }

    // fullfill propertySetters
    public override get propertySetters()
    {
        return this.initSetters({
            // set this human's IQ according to if he is smart
            mind: (human, mind) =>
            {
                if (mind == "smart") { human.IQ = 120; }
                else if (mind == "normal") { human.IQ = 90; }
                else if (mind == "stupid") { human.IQ = 70; }
            },
            // set this human's salary according to if he is rich
            wealth: (human, wealth) =>
            {
                if (wealth == "rich") { human.salary = 30000; }
                else if (wealth == "medium") { human.salary = 10000; }
                else if (wealth == "poor") { human.salary = 8000; }
            }
        });
    }
}

// create a human
const me = new Human(90, 8000);
// create a human parser
const humanParser = new HumanParser();

// get my evaluation
humanParser.get(me); // which is {mind: "stupid", wealth: "poor"}
// get my mind evaluation Individually
humanParser.get(me, "mind"); // which is {mind: "stupid"}
// get my wealth evaluation Individually
humanParser.get(me, "wealth"); // which is {wealth: "poor"}

// set my evaluation
humanParser.set(me, { mind: "smart", wealth: "rich" }); // my IQ will be 120 and my salary will be 30000
// set my mind evaluation Individually
humanParser.set(me, { mind: "smart" }); // my IQ will be 120 but my salary will stay the same
// set my wealth evaluation Individually
humanParser.set(me, { wealth: "rich" }); // my salary will be 30000 but my IQ will stay the same

// a parser helper will parse multiple types according the input value 
// create a parser maps type
type ParserMaps = ParserMapsBase<[HumanParserMap, ...anotherParserMaps]>;
// use this maps to define a ParserHelper
class ParserHelper extends ParserHelperBase<ParserMaps>{ };
// create a parserHelper
const parserHelper = new ParserHelper();
// this parserHelper will automatically get HumanParser since the input value is me
parserHelper.get(me); // which is {mind: "smart", wealth: "rich"}

```

### Node usage:

```js

// use require
const {
    addToParserHelper, DataParserBase, ParserHelperBase, ParserMap, ParserMapsBase
} = require ("typed-data-parser");

// class Human 
class Human
{
    /**
     * IQ  of human
     */
    public IQ: number;
    /**
     * Salary  of human
     */
    public salary: number;
    constructor(IQ: number, salary: number)
    {
        this.IQ = IQ;
        this.salary = salary;
    }
}

// target data 
interface HumanEvaluation
{
    mind: "stupid" | "normal" | "smart";
    wealth: "poor" | "medium" | "rich";
}

// create parser map type
type HumanParserMap = ParserMap<Human, HumanEvaluation>;

// create parser to parse Human to HumanEvaluation
@addToParserHelper(Human) // we must register parserMap to parserHelper so we can get the correct parser!
class HumanParser extends DataParserBase<HumanParserMap>{

    // fullfill propertyGetters
    public override get propertyGetters()
    {
        return this.initGetters({
            // set mind according to this human's IQ
            mind: (human) =>
            {
                if (human.IQ > 120) { return "smart"; }
                if (human.IQ > 90) { return "normal"; }
                else { return "stupid"; }
            },
            // set wealth according to this human's salary
            wealth: (human) =>
            {
                if (human.salary > 30000) { return "rich"; }
                if (human.salary > 10000) { return "medium"; }
                else { return "poor"; }
            },
        });
    }

    // fullfill propertySetters
    public override get propertySetters()
    {
        return this.initSetters({
            // set this human's IQ according to if he is smart
            mind: (human, mind) =>
            {
                if (mind == "smart") { human.IQ = 120; }
                else if (mind == "normal") { human.IQ = 90; }
                else if (mind == "stupid") { human.IQ = 70; }
            },
            // set this human's salary according to if he is rich
            wealth: (human, wealth) =>
            {
                if (wealth == "rich") { human.salary = 30000; }
                else if (wealth == "medium") { human.salary = 10000; }
                else if (wealth == "poor") { human.salary = 8000; }
            }
        });
    }
}

// create a human
const me = new Human(90, 8000);
// create a human parser
const humanParser = new HumanParser();

// get my evaluation
humanParser.get(me); // which is {mind: "stupid", wealth: "poor"}
// get my mind evaluation Individually
humanParser.get(me, "mind"); // which is {mind: "stupid"}
// get my wealth evaluation Individually
humanParser.get(me, "wealth"); // which is {wealth: "poor"}

// set my evaluation
humanParser.set(me, { mind: "smart", wealth: "rich" }); // my IQ will be 120 and my salary will be 30000
// set my mind evaluation Individually
humanParser.set(me, { mind: "smart" }); // my IQ will be 120 but my salary will stay the same
// set my wealth evaluation Individually
humanParser.set(me, { wealth: "rich" }); // my salary will be 30000 but my IQ will stay the same

// a parser helper will parse multiple types according the input value 
// create a parser maps type
type ParserMaps = ParserMapsBase<[HumanParserMap, ...anotherParserMaps]>;
// use this maps to define a ParserHelper
class ParserHelper extends ParserHelperBase<ParserMaps>{ };
// create a parserHelper
const parserHelper = new ParserHelper();
// this parserHelper will automatically get HumanParser since the input value is me
parserHelper.get(me); // which is {mind: "smart", wealth: "rich"}

```

### Static usage:

Old school method

```html
<script src="./bin/typedDataParser.js"></script>
<script>
	
// create a human
const me = new Human(90, 8000);
// create a human parser
const humanParser = new HumanParser();

// get my evaluation
humanParser.get(me); // which is {mind: "stupid", wealth: "poor"}
// get my mind evaluation Individually
humanParser.get(me, "mind"); // which is {mind: "stupid"}
// get my wealth evaluation Individually
humanParser.get(me, "wealth"); // which is {wealth: "poor"}

// set my evaluation
humanParser.set(me, { mind: "smart", wealth: "rich" }); // my IQ will be 120 and my salary will be 30000
// set my mind evaluation Individually
humanParser.set(me, { mind: "smart" }); // my IQ will be 120 but my salary will stay the same
// set my wealth evaluation Individually
humanParser.set(me, { wealth: "rich" }); // my salary will be 30000 but my IQ will stay the same

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

test project

```bash
npm run test
```

build project

```bash
npm run build
```

build api docs

```bash
npm run docs
```