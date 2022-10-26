/**
 * create a parser rule type
 * @example
 * // parse A to ATarget
 * type AParserRule = ParserRule<A, ATarget>;
 */
export type ParserRule<OriObjectType extends Object = Object, TargetDataType extends Record<string, any> = Record<string, any>, ExDataType = any, ParserType extends DataParserBase<any> = DataParserBase<any>> = {
    oriObjectType: OriObjectType;
    targetDataType: TargetDataType;
    exDataType?: ExDataType;
    parserType: ConstructorType<ParserType>;
};

/**
 * data parser interface,implements this interface to ensure we have getters and setters been set properly
 */
export interface IDataParser<Rule extends ParserRule>
{
    propertyGetters: { [P in keyof Rule["targetDataType"]]: (value: Rule["oriObjectType"], propertyName: string) => Rule["targetDataType"][P] };
    propertySetters: { [P in keyof Rule["targetDataType"]]: (value: Rule["oriObjectType"], targetValue: Rule["targetDataType"][P], propertyName?: string, exData?: Rule["exDataType"], callback?: () => void) => void };
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
export const EmptySetter = (...args: unknown[]) => { };

/**
 * define a parser
 * @example
 * // define a parser which parser A to ATarget
 * class AParser extends DataParserBase<AParserRule> { }
 */
export abstract class DataParserBase<parserRule extends ParserRule>{
    private static gettersCache: Map<DataParserBase<any>, any> = new Map<DataParserBase<any>, any>();
    private static settersCache: Map<DataParserBase<any>, any> = new Map<DataParserBase<any>, any>();

    public readonly oriObjectType: ConstructorType<parserRule["oriObjectType"]>;

    constructor(oriDataType: ConstructorType<parserRule["oriObjectType"]>)
    {
        this.oriObjectType = oriDataType;
    }

    public abstract get propertyGetters(): IDataParser<parserRule>["propertyGetters"];
    protected initGetters<T extends IDataParser<parserRule>["propertyGetters"]>(getterDescription: T): T
    {
        //TODO:find more elegant way to solve base class's unwanted register
        const getters = DataParserBase.gettersCache.get(this);
        if (getters == undefined || Object.keys(getters).length < Object.keys(getterDescription).length) {
            DataParserBase.gettersCache.set(this, { ...getterDescription });
        }
        return DataParserBase.gettersCache.get(this);
    }

    public abstract get propertySetters(): IDataParser<parserRule>["propertySetters"];
    protected initSetters<T extends IDataParser<parserRule>["propertySetters"]>(setterDescription: T): T
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
    public get<PropertyNames extends Extract<keyof parserRule["targetDataType"], string>[]>(value: parserRule["oriObjectType"], ...propertyNames: PropertyNames): PropertyNames extends [] ? parserRule["targetDataType"] : Pick<parserRule["targetDataType"], PropertyNames[number]>
    {
        // if propertyNames is not null,return the data matched propertyNames
        if (propertyNames && propertyNames.length > 0) {
            const result: Pick<parserRule["targetDataType"], PropertyNames[number]> = Object.create(null);
            propertyNames.forEach(propertyName =>
            {
                // get property getter by propertyName
                const propertyGetter = this.propertyGetters?.[propertyName];
                // return property parsed by the getter
                if (propertyGetter != undefined) {
                    result[propertyName] = propertyGetter.call(this, value, propertyName);
                }
            });
            return result as Pick<parserRule["targetDataType"], PropertyNames[number]> as any;
        }

        // if propertyNames is null return all properties
        const targetData: parserRule["targetDataType"] = Object.create(null);
        for (let propertyName in this.propertyGetters) {
            // get property getter by propertyName
            const propertyGetter = this.propertyGetters[propertyName];
            //  return property parsed by the getter
            if (propertyGetter != undefined) {
                targetData[propertyName] = propertyGetter.call(this, value, propertyName);
            }

        }
        //TODO:find more elegant way to return conditional type
        return targetData as parserRule["targetDataType"] as any;
    }

    /**
     * set property value
     * @param value original data
     * @param partialTargetData propertyName-propertyValue key pairs
     * @param [extras] extras data,which is helpful when we want to do something else after the property is been set
     */
    public set(value: parserRule["oriObjectType"], partialTargetData: Partial<parserRule["targetDataType"]>, extras?: { exData?: parserRule["exDataType"], callback?: () => void }): void
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

type ConstructorType<T> = new (...args: any) => T;

/**
 * create a parserRules which contains many parserRule
 * @example
 * // create a parserRules contains AParserRule,BParserRule and CParserRule
 * type ParserRules = ParserRulesBase<[AParserRule, BParserRule, CParserRule]>;
 */
export type ParserRulesBase<Rules extends ParserRule[]> = Rules;

/**
 * get parserType by original objet type
 * @example
 * // get parser type
 * type parserType = GetParserByRules<ParserRules,A>; // which will be AParser 
 */
export type GetParserByRules<Rules extends ParserRule[], OriObjectType> = Rules[{
    [key in keyof Rules]: Rules[key] extends { oriObjectType: OriObjectType } ? key : never
}[number]];
type TargetDataType<Rules extends ParserRule[], OriObjectType> = GetParserByRules<Rules, OriObjectType>["targetDataType"];
type ParserType<Rules extends ParserRule[], OriObjectType> = InstanceType<GetParserByRules<Rules, OriObjectType>["parserType"]>;


export abstract class ParserHelperBase<Rules extends ParserRule[]>
{
    /**
     * parser rules that is registed to the helper
     */
    protected parserRules: Map<Object, Set<DataParserBase<any>>> = new Map<Object, Set<DataParserBase<any>>>();

    /**
     * Creates an instance of parser helper base.
     * @param [parsers] 
     */
    constructor(parsers?: InstanceType<Rules[number]["parserType"]>[])
    {
        parsers?.forEach(parser =>
        {
            const parsers = this.parserRules.get(parser.oriObjectType);
            if (parsers == undefined) {
                this.parserRules.set(parser.oriObjectType, new Set<DataParserBase<any>>().add(parser));
            }
            else {
                parsers.add(parser);
            }
        });
    }

    /**
     * get parser by input value type
     * @param value input value
     * @param [parserType] can set parserType manually
     * @returns matched parser 
     */
    public getParser<T extends Rules[number]["oriObjectType"], U extends ParserType<Rules, T> = any>(value: T, parserType?: ConstructorType<U>): U extends undefined ? ParserType<Rules, T> : Extract<ParserType<Rules, T>, U> | undefined
    {
        const parsers = this.parserRules.get(value.constructor);
        if (parsers != undefined) {
            const parsersArry: DataParserBase<any>[] = [];
            parsers.forEach(parser =>
            {
                parsersArry.push(parser);
            });
            if (parserType == undefined) {
                return parsersArry[parsersArry.length - 1] as any;
            }
            else {
                return parsersArry.find(parser => parser instanceof (parserType as any)) as any;
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
    public get<T extends Rules[number]["oriObjectType"], U extends Extract<(keyof TargetDataType<Rules, T> | undefined), string>[]>(value: T, ...propertyNames: U): U extends [] ? TargetDataType<Rules, T> : Pick<TargetDataType<Rules, T>, U[number]>
    {
        const parser = this.getParser(value) as DataParserBase<any>;
        return parser?.get(value, ...propertyNames);
    }

    /**
     * set data by parser
     * @param value input value
     * @param partialTargetData propertyName-propertyValue key pairs
     * @param [extras] extras data,which is helpful when we want to do something else after the property is been set
     */
    public set<T extends Rules[number]["oriObjectType"]>(value: T, partialTargetData: Partial<TargetDataType<Rules, T>>, extras?: { exData?: any, callback?: () => void }): void
    {
        const parser = this.getParser(value) as DataParserBase<any>;
        return parser?.set(value, partialTargetData, extras);
    }
}