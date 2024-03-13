export const required = (val: unknown): true | string =>
  val ? true : "This field is required";
