<img src="https://i.postimg.cc/fRVmrxXD/logo.png" width="200" />

# LLM Translator

This is a toolkit for LLM translation. Currently command-line only, but potential for import as a node-module.

## What is LLM translation?

It's evolving from the old NMT's (Neural Machine Translator models) to using Large Language Models (LLM) as the translator.

## Why?

Because LLM translations are the way to go. This can allow for semantic and syntactic examples to be added to an LLM translation request.
[Read our post about using a Vector TMX Database](https://baobabtech.ai/posts/a-paradigm-shift-in-machine-translation-vector-embeddings-as-translation-memory)

And [read all the research](RESEARCH.md) also available in this [IKI.ai Collection](https://app.iki.ai/playlist/724)

## Usage

Each tool is in its own folder and most are command-line interactive tools.
Make sure to run `yarn install` to have libraries installed.

### Tools

1. [TMX Generator](./tmx-generator) - Generates TMX files for us with translations or the upcomgin TMC Vector/Hybrid Database
2. [docx xlsx pptx Translator](./xliff) - Generates XLIFF files then translates them using LLM translation
3. [LLM Translator] - The main translator tool using a mix of LLMs and the concept of TMX Vector/Hybrid Databases
3. ... more coming soon

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/baobab-tech/llm-translator.git
```

### 2. Install dependencies:

```bash
yarn install
```

### 3. Add your .env file:

```bash
OPEN_AI_KEY = your-openai-key
TMX_INPUT_PAIRS_DIR = data/input/pairs
TMX_INPUT_SINGLES_DIR = data/input/singles
TMX_OUTPUT_DIR = data/output
```

### 4.  Using LLMs:
   
The TMX generator relies on a decent enough LLM to run basic phrase matching for the "pairs" method and good basic translation of <target> to english for the "singles" method. So the LLM needs to be able to understand the <target> language to translate it to english.

The XLIFF Translator LLM needs to manage placeholder from the xliff, after lots of testing the best models to do this with limited errors are (balancing cost so exlude GPT4 and Claude-3-Opus): GPT-3.5-turbo, Claude-3-Haiku, and Hermes-2-Mixtral-8x7b variant (using Fireworks AI to serve it)

You can pick the LLM by setting the environment variable in `.env`

```env
LLM="gpt3.5"
```

Here is the list of options: 
- OpenAI: `gpt3.5`, 
- Anthropic/Claude-3: `haiku`, `sonnet`, 
- Cohere: `cmdr`, `cmdrplus` 
- Open models: `mixtral`, `h2mixtral` (served by Fireworks AI)

### Why typescript

Why not? Python can go rest a bit.

## Roadmap

1. Spin up a TMX Vector Database
2. Build more tools
3. Spin-up a self-hosted service to translate

## Contributing

We welcome contributions to improve this project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -am 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the CC-BY License - see the LICENSE file for details.
