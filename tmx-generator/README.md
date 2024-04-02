
# TMX Generator
This command-line (interactive) tool facilitates the generation of Translation Memory eXchange (TMX) files from pairs of translation PDFs or single target language documents. 

## The "pairs" method
It automates the extraction of text from PDF pairs (i.e. a document that has been translated) and matches the translation extraction the paired-phrases

## The "singles" method
It translate the target language to english using a good enough LLM

## Which LLM should I use?
Depending on the target language, we recommend GPT-3.5-turbo-0125 at least, or Claude-Haiku. Mixtral-8x7b could extract and possible translate more high-resource languages, but don't use any 7b models. Haven't tried with the 30b-70b.

## Generation
It then generates a TMX file (v1.4b) for use in translation.

## Costs
Depending on which LLM you use,

## Features

- **PDF Pair Processing**: Process pairs of translation PDFs (e.g., English and French versions of a document) to generate TMX files.
- **Single File Processing**: Process single-language PDFs by automatically translating them to a target language using a Language Model, then generating TMX files.
- **Interactive CLI**: Uses command-line user interaction for file selection and processing steps.

## Prerequisites

- Node.js
- TypeScript

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/baobab-tech/llm-translator.git
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Setup up and using LLMs
   
   This TMX generator relies on a decent enough LLM to run basic phrase matching for the "pairs" method and good basic translation of <target> to english for the "singles" method. So the LLM needs to be able to understand the <target> language to translate it to english.

4. Add your .env file:

    ```bash
    OPEN_AI_KEY=<your-openai-key>
    PAIRS_DIR=data/input/pairs
    SINGLES_DIR=data/input/singles
    OUTPUT_DIR=data/output
    ```

## Usage

1. Place your PDFs in the appropriate directories:
   - For pairs: `data/input/pairs/[name]_en.pdf` and `data/input/pairs/[name]_fr.pdf`
   ⚠️ Make sure the pairs have the same exact name with language code endings
   - For single files: `data/input/singles/[name]_[language].pdf`

   You can change the folder paths in your `.env` file

   Example folders:
   ```bash
   /tmx-generator
     |__data
          |__input
              |__pairs
                  |__ document_en.pdf
                  |__ document_fr.pdf
   ```
   
2. Run the script (it runs `npx tsx index.ts`)

   ```bash
   yarn run gen
   ```

3. Follow the interactive prompts to select the file type (Pairs or Singles) and the files to process.

## Roadmap

1. Add support for other file types (e.g., Word documents)
2. Support other than english as the base language
3. Add support for other translation engines (e.g., Google Translate) for the "singles" method


---

For more information on TMX and its uses in translation and localization, visit [Translation Memory eXchange (TMX)](https://en.wikipedia.org/wiki/Translation_Memory_eXchange).
