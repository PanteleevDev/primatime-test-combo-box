import { isBoolean, isString } from "lodash-es";

export type typeCheckFn = (el: unknown) => true | string;

export const validateFields = <T extends string = string>(
  data: Record<T, unknown>,
  validateFns: Partial<Record<T, typeCheckFn[]>>
): true | Record<T, string> => {
  let res: true | Record<T, string> = true;

  for (const k of Object.keys(validateFns) as T[]) {
    const fnRes = validateField(data[k], validateFns[k]);
    if (isString(fnRes)) {
      if (isBoolean(res)) {
        res = {} as Record<T, string>;
      }
      res[k] = fnRes;
    }
  }

  return res;
};

export const validateField = (
  val: unknown,
  fns: typeCheckFn[]
): true | string => {
  return fns.reduce((acc, fn) => (isString(acc) ? acc : fn(val)), true);
};
