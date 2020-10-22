import { FieldError } from "../generated/graphql";

export type ErrorOverrideOption = {
  [type: string]: string;
}

export const mapError = (errors: FieldError[], option?: ErrorOverrideOption) => {
  const map: Record<string, string> = {};
  errors.forEach(({field, message}: FieldError) => {
    let key = field;
    if (option && option[field]) {
      key = option[field];
    }
    map[key] = message;
  });

  return map;
}