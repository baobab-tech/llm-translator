# XLIFF for .docx, .xlsx, .pptx, .html .idml translations

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