import { FieldError } from "../generated/graphql";

export const mapError = (errors: FieldError[]) => {
  const map: Record<string, string> = {};
  errors.forEach(({field, message}: FieldError) => {
    map[field] = message;
  });

  return map;
}