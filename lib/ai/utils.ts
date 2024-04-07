/**
 * Because of LangChain's templating, we need to escape curly braces
 * by replace { with {{ .. and } with }}
 * @param text
 * @returns
 */
export const escapeCurlys = (text: string) => {
  return text.replace(/[{}]/g, (match) => {
    return `${match}${match}`;
  });
};
