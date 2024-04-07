import { PLACEHOLDER_BRACKETS } from "./phrasePrepare";

export const placeholderCountError = (source: string, target: string) => {
  return (
    source.split(PLACEHOLDER_BRACKETS[0]).length !=
    target.split(PLACEHOLDER_BRACKETS[0]).length
  );
};
