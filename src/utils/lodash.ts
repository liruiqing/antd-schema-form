/* Object.entries的兼容方法 */
interface EntriesObj {
  [s: string]: any;
}

type EntriesArr = Array<[string, any]>;

interface ObjectEntriesFunc {
  (o: EntriesObj): EntriesArr;
}

interface ObjectFromEntriesFunc {
  (o: EntriesArr): EntriesObj;
}

export const _ObjectEntries: ObjectEntriesFunc = Object.entries ?? function(o: EntriesObj): EntriesArr {
  const result: Array<[string, any]> = [];

  for (const key in o) {
    result.push([key, o[key]]);
  }

  return result;
};

export const ObjectEntries: ObjectEntriesFunc = (o: EntriesObj = {}) => _ObjectEntries(o);

/* @ts-ignore Object.fromEntries的兼容方法 */
export const _ObjectFromEntries: ObjectFromEntriesFunc = Object.fromEntries ?? function(o: EntriesArr): EntriesObj {
  const result: { [s: string]: any } = {};

  o.forEach(function([k, v]: [string, any]): void {
    result[k] = v;
  });

  return result;
};

export const ObjectFromEntries: ObjectFromEntriesFunc = (o: EntriesArr = []) => _ObjectFromEntries(o);

/**
 * omit函数的实现
 * @param { T } obj: object
 * @param { string[] } delKeys: 从object中删除的keys
 */
export function omit<T = object, U = T>(obj: T = {} as T, delKeys: string[]): U {
  return ObjectEntries(obj).reduce(function(result: U, [key, value]: [string, any]): U {
    if (!delKeys.includes(key)) {
      result[key] = value;
    }

    return result;
  }, {} as U);
}

/* 判断是否为null或undefined */
export function isNil(o: any): boolean {
  return typeof o === 'undefined' || o === null;
}

/* 判断是否为boolean类型 */
export function isBoolean(o: any): boolean {
  return typeof o === 'boolean';
}

/* 判断是否为object类型 */
export function isObject(o: any): boolean {
  return typeof o === 'object' && o !== null;
}

/* 判断是否为object类型 */
export function isPlainObject(o: any): boolean {
  return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Object]';
}

/* 判断是否为number类型 */
export function isNumber(o: any): boolean {
  return typeof o === 'number';
}

/* 判断是否为string类型 */
export function isString(o: any): boolean {
  return typeof o === 'string';
}

/* 判断是否为array类型 */
export const isArray: (o: any) => boolean = Array.isArray ?? function(o: any): boolean {
  return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
};