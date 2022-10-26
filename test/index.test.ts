import { describe, expect, test } from "@jest/globals";

import {
    DataParserBase, DefaultGetter, DefaultSetter, IDataParser, ParserHelperBase, ParserRule,
    ParserRulesBase
} from "../src/index";

// original data type
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
// create parser rule
type AParserRule = ParserRule<A, ATarget, any, AParser>;
// set parser rule
class AParser extends DataParserBase<AParserRule>{
    public override get propertyGetters()
    {
        return this.initGetters({
            id: DefaultGetter
        });
    }

    public override get propertySetters()
    {
        return this.initSetters({
            id: DefaultSetter
        });
    }
}

// original data type
class B
{
    public name: string;
    constructor(name: string)
    {
        this.name = name;
    }
}
// target data type
interface BTarget
{
    name: string;
}
// create parser rule
type BParserRule = ParserRule<B, BTarget, any, BParser>;
// set parser rule
class BParser extends DataParserBase<BParserRule>{
    public override get propertyGetters()
    {
        return this.initGetters({
            name: DefaultGetter
        });
    }

    public override get propertySetters()
    {
        return this.initSetters({
            name: DefaultSetter
        });
    }
}

// original data type
class C extends A
{
    name: string;
    constructor(id: number, name: string)
    {
        super(id);
        this.name = name;
    }
}
// target data type
interface CTarget extends ATarget
{
    name: string;
}
// create parser rule
type CParserRule = ParserRule<C, CTarget, any, CParser>;
// set parser rule
class CParser extends AParser implements IDataParser<CParserRule>{
    public override get propertyGetters()
    {
        return this.initGetters({
            ...super["propertyGetters"],
            name: DefaultGetter
        });
    }

    public override get propertySetters()
    {
        return this.initSetters({
            ...super["propertySetters"],
            name: DefaultSetter
        });
    }
}

// create parser rules
type ParserRules = ParserRulesBase<[AParserRule, BParserRule, CParserRule]>
class ParserHelper extends ParserHelperBase<ParserRules>{ };

/* ------------------------------------------------------ 测试用例 ----------------------------------------------------- */

const a = new A(1);
const b = new B("Tom");
const c = new C(1, "Tom");
const aParser = new AParser(A);
const bParser = new BParser(B);
const cParser = new CParser(C);
const parserHelper = new ParserHelper([aParser, bParser, cParser]);

describe('get data of a', () =>
{
    test('id of a is 1', () =>
    {
        expect(parserHelper.get(a)).toEqual({ id: 1 });
    });
});

describe('get data of b', () =>
{
    test('name of b is Tom', () =>
    {
        expect(parserHelper.get(b)).toEqual({ name: "Tom" });
    });
});

describe('get data of c', () =>
{
    test('id of c is 1 and name of c is Tom', () =>
    {
        expect(parserHelper.get(c)).toEqual({ id: 1, name: "Tom" });
    });
});

describe('set data of a', () =>
{
    test('set id of a to 2', () =>
    {
        parserHelper.set(a, { id: 2 });
        expect(a).toEqual({ id: 2 });
    });
});

describe('set data of b', () =>
{
    test('set name of b to Jerry', () =>
    {
        parserHelper.set(b, { name: "Jerry" });
        expect(b).toEqual({ name: "Jerry" });
    });
});

describe('set data of c', () =>
{
    test('set id of c to 2 and name of c to Jerry', () =>
    {
        parserHelper.set(c, { id: 2, name: "Jerry" });
        expect(c).toEqual({ id: 2, name: "Jerry" });
    });
});