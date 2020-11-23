export const strconv = {
  camelCaseToHyphens: (myString: string) => {
    return myString.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() }); 
  },

  hyphensToCamelCase: (myString: string) => {
    return myString.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  },
}