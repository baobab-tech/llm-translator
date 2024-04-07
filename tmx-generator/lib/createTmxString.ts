export type TUType = {
  source: string;
  sourceLanguage?: string;
  language: string;
  target: string;
};
export const createTUString = ({
  source,
  language,
  target,
}: TUType) =>
  `<tu><tuv xml:lang="en"><seg>${source}</seg></tuv><tuv xml:lang="${language}"><seg>${target}</seg></tuv></tu>`;

export const createTmxContentString = ({ tmxUnits }: { tmxUnits: TUType[] }) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <tmx version="1.4b">
        <header creationtool="Custom Script" srclang="en" adminlang="en" datatype="plaintext" o-tmf="tmx" segtype="sentence" creationdate="${new Date().toISOString()}"/>
        <body>
         ${tmxUnits.map((unit) => createTUString(unit)).join("\n")}
        </body>
      </tmx>`;
};
