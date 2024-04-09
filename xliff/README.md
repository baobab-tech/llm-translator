# XLIFF for .docx, .xlsx, .pptx, .html .idml translations

This tool is to help with document translation (namely docx, xlsx and pptx) other formats coming soon.
It uses XLIFF which is a standard old tool that extracts phrases to be used with translation software.
The difference is that we use a custom XLIFF parser to allow for using an LLM (Large Language Model) to translate the phrases in batches.

## Critical dependancy

⚠️ Currently, we require `tikal` to be installed locally, see below.

## Tools

This toolset allows for extracting, translating and merging XLIFF files (ie translating docx etc documents)
It's command line interactive can do file by file (step by step) or a whole folder.

## Usage

Run the following command to run the command line tool which you can interact with.
It uses a choise of LLMs to do translations of the XLIFF files without any context (sample translations from TMX) injection so the quality might be limited.
Make sure to have `tikal` see below.

Set and see list of LLMs in the `.env`

```bash
yarn run xliff
```

## Limitations
- One documet at a time
- Uses english as the base language (has to be for now)
- Uses single-shot LLM translations (working on LLM Translate and will update here)
- Requires local copy of Tikal (java) to do XLIFF extraction and merging. (see below)


## Tikal and XLIFF
We need to use java versions of Tikal (Okapi) to run the XLIFF generation and merging
You need to download the package from https://okapiframework.org/binaries/main/1.46.0/okapi-lib_all-platforms_1.46.0.zip
Then extract the zip into `xliff/tikal` so that the tikal script can be called (i.e. `xliff/tikal/tikal.sh`)

We are working on packaged version of this using something else to import into nodejs.

## Manual Tikal commands

To generate an xliff from a docx, xlsx, pptx, html, or idml file:
```bash
./tikal.sh -x ../data/file_en.docx -sl en -tl fr -nocopy
```
This example is english to french and no copy of the english phrases in the target segments of the .xlf

To merge back:
```bash
./tikal.sh -m ../data/file_en.docx.xlf