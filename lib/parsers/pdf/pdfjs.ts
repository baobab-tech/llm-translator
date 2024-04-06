import fs from "fs";
import { Metadata } from "pdfjs-dist/types/src/display/metadata.js";
import { getDocument } from "pdfjs-dist";
const PDF_DEFAULT_OPTIONS = {
  max: 0,
};

export type PageText = {
  pageNum: number;
  text: string;
};

export type PDFTextReturnType<IsPageByPage extends boolean> = {
  numpages: number;
  numrender: number;
  info: any | undefined;
  metadata: Metadata | undefined;
  text: IsPageByPage extends true ? PageText[] : string;
  version?: string;
};

// export type ReadPDFReturnType<T extends boolean> = Pick<PDFTextReturnType<T>, "numpages" | "numrender" | "info" | "text">;

/**
 * Asynchronously extracts text from a PDF file, using `pdfjs-dist` from mozilla pdfjs
 *
 * @param file The local file path of the PDF to be processed.
 * @returns {PDFTextReturnType} A Promise that resolves to an object containing various details about the PDF, such as number of pages, metadata, and the extracted text. If the file is not a valid PDF or an error occurs, it returns null.
 */

export const getTextFromPdf = async <T extends boolean>(
  file: string,
  {
    pageByPage = false,
    maxPages = 0,
  }: { pageByPage?: boolean; maxPages?: number }
): Promise<PDFTextReturnType<T> | null> => {
  const content = fs.readFileSync(file) as any;
  if (!(content instanceof Buffer)) {
    console.warn(`PDF File ${file} can only be loaded using the Node FS`);
    return null;
  }
  const data = new Uint8Array(
    content.buffer,
    content.byteOffset,
    content.byteLength
  );
  const pdf = await readPDF(data, { max: maxPages }, pageByPage);
  return pdf;
};

/**
 * Given a buffer Uint8Array of a PDF file, extract the text from the PDF.
 * Get the first "pageCount" pages or wordCount from the PDF as text
 * @param pdfFileData
 * @param pageCount
 * @param wordCount
 * @returns {Promise<string>} A Promise that resolves to the extracted text from the PDF.
 */
export const getTextFromPdfBuffer = async (
  pdfFileData: Uint8Array,
  { pageCount, wordCount }: { pageCount?: number; wordCount?: number } = {}
) => {
  const pdfPages = (await readPDF(
    pdfFileData,
    { max: pageCount || 0 },
    true
  )) as PDFTextReturnType<true>;
  if (pageCount)
    return pdfPages?.text
      .slice(0, pageCount)
      .map((page: PageText) => page.text)
      .join("\n");
  if (wordCount)
    return pdfPages?.text
      .map((t) => t.text)
      .join("\n")
      .split(" ")
      .slice(0, wordCount)
      .join(" ");
  return pdfPages?.text.map((t) => t.text).join("\n");
};

/**
 * Main function to read the PDF from the buffer
 * @param data - Uint8Array of the PDF file
 * @param options - max: number of pages to read
 * @param pageByPage - if true, returns the text in a page by page format
 * @returns {Promise<PDFTextReturnType<T> | null>} A Promise that resolves to an object containing various details about the PDF, such as number of pages, metadata, and the extracted text. If the file is not a valid PDF or an error occurs, it returns null.
 */
export async function readPDF<T extends boolean>(
  data: Uint8Array | Buffer,
  options = PDF_DEFAULT_OPTIONS,
  pageByPage: boolean
): Promise<PDFTextReturnType<T> | null> {
  // const { getDocument } = await import("pdfjs-dist");

  const pdfData = data instanceof Buffer ? new Uint8Array(data) : data;

  const doc = await getDocument({ data: pdfData }).promise;
  const metaData = await doc.getMetadata().catch(() => null);
  const counter =
    options.max === 0 ? doc.numPages : Math.min(options.max, doc.numPages);

  let text = pageByPage ? [] : "";

  for (let i = 1; i <= counter; i++) {
    try {
      const pageData = await doc.getPage(i);
      const pageText = await readPage(pageData);

      if (pageByPage) {
        (text as PageText[]).push({ pageNum: i, text: pageText });
      } else {
        text += `\n\n${pageText}`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  await doc.destroy();

  return {
    numpages: doc.numPages,
    numrender: counter,
    info: metaData?.info,
    metadata: metaData?.metadata,
    text: text as PDFTextReturnType<T>["text"],
  };
}

async function readPage(pageData: any) {
  //check documents https://mozilla.github.io/pdf.js/
  const textContent = await pageData.getTextContent({
    includeMarkedContent: false,
  });

  let lastY = null,
    text = "";
  //https://github.com/mozilla/pdf.js/issues/8963
  //https://github.com/mozilla/pdf.js/issues/2140
  //https://gist.github.com/hubgit/600ec0c224481e910d2a0f883a7b98e3
  //https://gist.github.com/hubgit/600ec0c224481e910d2a0f883a7b98e3
  for (const item of textContent.items) {
    if (lastY == item.transform[5] || !lastY) {
      text += item.str;
    } else {
      text += "\n" + item.str;
    }
    lastY = item.transform[5];
  }
  return text;
}
