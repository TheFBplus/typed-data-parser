import { describe, expect, test } from "@jest/globals";

import {
    addToParserHelper, DataParserBase, DefaultGetter, DefaultSetter, IDataParser, ParserHelperBase,
    ParserMap, ParserMapsBase
} from "../src/index";

describe('get sum', () =>
{
    test('sum of 1 and 1 is 2', () =>
    {
        expect(1 + 1).toBe(2);
    });
});
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
// create parser map
type AParserMap = ParserMap<A, ATarget, any, AParser>;
// set parser map
@addToParserHelper(A)
class AParser extends DataParserBase<AParserMap>{
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
// create parser map
type BParserMap = ParserMap<B, BTarget, any, BParser>;
// set parser map
@addToParserHelper(B)
class BParser extends DataParserBase<BParserMap>{
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
// create parser map
type CParserMap = ParserMap<C, CTarget, any, CParser>;
// set parser map
@addToParserHelper(C)
class CParser extends AParser implements IDataParser<CParserMap>{
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

// create parser maps
type ParserMaps = ParserMapsBase<[AParserMap, BParserMap, CParserMap]>
class ParserHelper extends ParserHelperBase<ParserMaps>{ };

/* ------------------------------------------------------ 测试用例 ----------------------------------------------------- */

const a = new A(1);
const b = new B("Tom");
const c = new C(1, "Tom");
const parserHelper = new ParserHelper();

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