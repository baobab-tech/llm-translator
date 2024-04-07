import { parseXLIFFContent } from "@/xliff/lib/parseXliff";
import { TUType, createTmxContentString } from "./createTmxString";

export const generateTmxFromXliff = (xliffDocString: string) => {
  const tmxTUs: TUType[] = [];
  const doc = parseXLIFFContent(xliffDocString);
  Object.keys(doc).forEach((namespace) => {
    doc[namespace].forEach((tu) => {
      tmxTUs.push({
        source: tu.source,
        target: tu.target,
        language: tu.language,
      });
    });
  });
  return createTmxContentString({ tmxUnits: tmxTUs });
};
