/**
 * create a parsermap type
 * @example
 * // parse A to ATarget
 * type AParserMap = ParserMap<A, ATarget>;
 */
export type ParserMap<OriObjectType extends Object = Object, TargetDataType extends Record<string, any> = Record<string, any>, ExDataType = unknown, ParserType extends DataParserBase<any> = DataParserBase<any>> = {
    oriObjectType: OriObjectType;
    targetDataType: TargetDataType;
    exDataType?: ExDataType;
    parserType: ConstructorType<ParserType>;
};

/**
 * data parser interface
 */
export interface IDataParser<Map extends ParserMap>
{
    propertyGetters: { [P in keyof Map["targetDataType"]]: (value: Map["oriObjectType"], propertyName: string) => Map["targetDataType"][P] };
    propertySetters: { [P in keyof Map["targetDataType"]]: (value: Map["oriObjectType"], targetValue: Map["targetDataType"][P], propertyName?: string, exData?: Map["exDataType"], callback?: () => void) => void };
}

/**
 * default getter,get property directly
 * @param value original data
 * @param propertyName the propertyName
 * @returns value[propertyName]
 */
export const DefaultGetter = (value: object, propertyName: string) => propertyName ? (value as any)[propertyName] : undefined;
/**
 * default setter,set property directly
 * @param value original data
 * @param targetValue target value
 * @param [propertyName] the propertyName
 * @param [exData] extras data,which is helpful when we want to do something else after the property is been set
 */
export const DefaultSetter = (value: object, targetValue: unknown, propertyName?: string, exData?: unknown) => { propertyName && ((value as any)[propertyName] = targetValue) };
/**
 * do nothing,which is helpful is we want this property to be readonly
 * @param args any arguments
 */
export const EmptySetter = (...args: unknown[]) => { }; // 空属性设置器，即不进行任何操作

/**
 * define a parser
 * @example
 * // define a parser which parser A to ATarget
 * class AParser extends DataParserBase<AParserMap> { }
 */
export abstract class DataParserBase<parserMap extends ParserMap>{
    private static gettersCache: Map<DataParserBase<any>, any> = new Map<DataParserBase<any>, any>();
    private static settersCache: Map<DataParserBase<any>, any> = new Map<DataParserBase<any>, any>();

    public abstract get propertyGetters(): IDataParser<parserMap>["propertyGetters"];
    protected initGetters<T extends IDataParser<parserMap>["propertyGetters"]>(getterDescription: T): T
    {
        //TODO:find more elegant way to solve base class's unwanted register
        const getters = DataParserBase.gettersCache.get(this);
        if (getters == undefined || Object.keys(getters).length < Object.keys(getterDescription).length) {
            DataParserBase.gettersCache.set(this, { ...getterDescription });
        }
        return DataParserBase.gettersCache.get(this);
    }

    public abstract get propertySetters(): IDataParser<parserMap>["propertySetters"];
    protected initSetters<T extends IDataParser<parserMap>["propertySetters"]>(setterDescription: T): T
    {
        const setters = DataParserBase.settersCache.get(this);
        if (setters == undefined || Object.keys(setters).length < Object.keys(setterDescription).length) {
            DataParserBase.settersCache.set(this, { ...setterDescription });
        }
        return DataParserBase.settersCache.get(this);
    }

    /**
     * get property value
     * @param value original data 
     * @param propertyNames property names,can be null
     * @returns property value
     */
    public get<PropertyNames extends Extract<keyof parserMap["targetDataType"], string>[]>(value: parserMap["oriObjectType"], ...propertyNames: PropertyNames): PropertyNames extends [] ? parserMap["targetDataType"] : Pick<parserMap["targetDataType"], PropertyNames[number]>
    {
        // if propertyNames is not null,return the data matched propertyNames
        if (propertyNames && propertyNames.length > 0) {
            const result: Pick<parserMap["targetDataType"], PropertyNames[number]> = Object.create(null);
            propertyNames.forEach(propertyName =>
            {
                // get property getter by propertyName
                const propertyGetter = this.propertyGetters?.[propertyName];
                // return property parsed by the getter
                if (propertyGetter != undefined) {
                    result[propertyName] = propertyGetter.call(this, value, propertyName);
                }
            });
            return result as Pick<parserMap["targetDataType"], PropertyNames[number]> as any;
        }

        // if propertyNames is null return all properties
        const targetData: parserMap["targetDataType"] = Object.create(null);
        for (let propertyName in this.propertyGetters) {
            // get property getter by propertyName
            const propertyGetter = this.propertyGetters[propertyName];
            //  return property parsed by the getter
            if (propertyGetter != undefined) {
                targetData[propertyName] = propertyGetter.call(this, value, propertyName);
            }

        }
        //TODO:find more elegant way to return conditional type
        return targetData as parserMap["targetDataType"] as any;
    }

    /**
     * set property value
     * @param value original data
     * @param partialTargetData propertyName-propertyValue key pairs
     * @param [extras] extras data,which is helpful when we want to do something else after the property is been set
     */
    public set(value: parserMap["oriObjectType"], partialTargetData: Partial<parserMap["targetDataType"]>, extras?: { exData?: parserMap["exDataType"], callback?: () => void }): void
    {
        // traverse the input data to set property
        for (let propertyName in partialTargetData) {
            const targetValue = partialTargetData[propertyName];
            const propertySetter = this.propertySetters?.[propertyName];
            // get property setter by propertyName
            if (targetValue && propertySetter) {
                // set property by setter
                propertySetter.call(this, value, targetValue, propertyName, extras?.exData, extras?.callback);
                // invoke callback
                extras?.callback?.();
            }
        }
    }
}

/**
 * this type is used to registe parserHelper 
 */
export type MapInstanceType<Map extends ParserMap> = { oriObjectType: ConstructorType<Map["oriObjectType"]>, parser: Map["parserType"] };

type ConstructorType<T> = new (...args: any) => T;

/**
 * create a parserMaps which contains many parserMap
 * @example
 * // create a parserMaps contains AParserMap,BParserMap and CParserMap
 * type ParserMaps = ParserMapsBase<[AParserMap, BParserMap, CParserMap]>;
 */
export type ParserMapsBase<Maps extends ParserMap[]> = Maps;

/**
 * get parserType by original objet type
 * @example
 * // get parser type
 * type parserType = GetParserByMaps<ParserMaps,A>; // which will be AParser
 */
export type GetParserByMaps<Maps extends ParserMap[], OriObjectType> = Maps[{
    [key in keyof Maps]: Maps[key] extends { oriObjectType: OriObjectType } ? key : never
}[number]];
type TargetDataType<Maps extends ParserMap[], OriObjectType> = GetParserByMaps<Maps, OriObjectType>["targetDataType"];
type ParserType<Maps extends ParserMap[], OriObjectType> = InstanceType<GetParserByMaps<Maps, OriObjectType>["parserType"]>;

/**
 * add parser to parser helper so the helper can select the parser by input value type 
 * @param oriObjectType original object type
 */
export function addToParserHelper<OriObjectType>(oriObjectType: ConstructorType<OriObjectType>)
{
    return function (target: ConstructorType<DataParserBase<ParserMap<OriObjectType>>>)
    {
        ParserHelperBase.registerMap({ oriObjectType: oriObjectType, parser: target });
    }
}

export abstract class ParserHelperBase<Maps extends ParserMap[]>
{
    /**
     * parser map that is registed to the helper
     */
    protected static parserMaps: Map<Object, Set<ConstructorType<DataParserBase<any>>>> = new Map<Object, Set<ConstructorType<DataParserBase<any>>>>();
    /**
     * the parser created,use to cache
     */
    protected parserCreated: Map<ConstructorType<DataParserBase<any>>, DataParserBase<any>> = new Map<ConstructorType<DataParserBase<any>>, DataParserBase<any>>();


    /**
     * Creates an instance of parser helper base.
     * @param [maps] 
     */
    constructor(maps?: MapInstanceType<Maps[number]>[])
    {
        maps?.forEach(mapInstance =>
        {
            ParserHelperBase.registerMap(mapInstance);
        });
    }

    /**
     * add parser map to helper to registe
     * @param map parser map to add
     */
    public static registerMap(map: MapInstanceType<any>)
    {
        const parsers = this.parserMaps.get(map.oriObjectType);
        if (parsers == undefined) {
            this.parserMaps.set(map.oriObjectType, new Set<ConstructorType<DataParserBase<any>>>().add(map.parser));
        }
        else {
            parsers.add(map.parser);
        }
    }

    /**
     * get parser by input value type
     * @param value input value
     * @param [parserType] can set parserType manually
     * @returns matched parser 
     */
    public getParser<T extends Maps[number]["oriObjectType"], U extends ParserType<Maps, T> = any>(value: T, parserType?: ConstructorType<U>): U extends undefined ? ParserType<Maps, T> : Extract<ParserType<Maps, T>, U> | undefined
    {
        function getParsers(value: any)
        {
            let result: any;
            ParserHelperBase.parserMaps.forEach((parsers, obj: any) =>
            {
                if (value instanceof obj) {
                    result = parsers;
                }
            });
            return result;
        }

        const parsers = getParsers(value) as ConstructorType<DataParserBase<any>>[];
        if (parsers != undefined) {
            let p: ConstructorType<DataParserBase<any>> | undefined;
            parsers.forEach(parser =>
            {
                if (parserType == undefined) {
                    p = parser;
                    return;
                }

                if (parser instanceof (parserType as any)) {
                    p = parser;
                    return;
                }
            });
            if (p != undefined) {
                if (this.parserCreated.get(p) == undefined) {
                    this.parserCreated.set(p, new p());
                }
                return this.parserCreated.get(p) as any;
            }
        }
        return undefined as any;
    }

    /**
     * get data from parser
     * @param value input value
     * @param propertyNames property names,can be null
     * @returns data matched propertyNames 
     */
    public get<T extends Maps[number]["oriObjectType"], U extends Extract<(keyof TargetDataType<Maps, T> | undefined), string>[]>(value: T, ...propertyNames: U): U extends [] ? TargetDataType<Maps, T> : Pick<TargetDataType<Maps, T>, U[number]>
    {
        const parser = this.getParser(value) as DataParserBase<any>;
        return parser.get(value, ...propertyNames);
    }

    /**
     * 通过对应转换器设置数据
     * @param value 源数据
     * @param partialTargetData 要设置的数据
     * @param exData 额外数据
     */
    /**
     * set data by parser
     * @param value input value
     * @param partialTargetData propertyName-propertyValue key pairs
     * @param [extras] extras data,which is helpful when we want to do something else after the property is been set
     */
    public set<T extends Maps[number]["oriObjectType"]>(value: T, partialTargetData: Partial<TargetDataType<Maps, T>>, extras?: { exData?: any, callback?: () => void }): void
    {
        const parser = this.getParser(value) as DataParserBase<any>;
        return parser.set(value, partialTargetData, extras);
    }
}