
## 2025

- [Déjà Vu: Multilingual LLM Evaluation through the Lens of Machine Translation Evaluation](https://hf.co/papers/2504.11829) - Kreutzer et al. | 16 Apr, 2025

Draws parallels between machine translation evaluation and multilingual large language model evaluation, addressing the lack of comprehensive, scientifically rigorous evaluation practices for generative abilities of mLLMs.

Demonstrates how best practices from MT evaluation can deepen understanding of quality differences between models through targeted experiments across key stages of the generative evaluation pipeline. Identifies essential components for robust meta-evaluation of mLLMs.

The work provides crucial insights by leveraging decades of MT evaluation development to create transparent reporting standards and reliable evaluations for multilingual generative models, ensuring evaluation methods themselves are rigorously assessed.

Distills findings into actionable recommendations for mLLM research and development, offering a systematic framework for evaluating multilingual capabilities that builds on established MT evaluation methodologies.

---

- [Enhancing Multilingual Language Models for Code-Switched Input Data](https://hf.co/papers/2503.07990) - Xie et al. | 11 Mar, 2025

Investigates pre-training Multilingual BERT (mBERT) on code-switched datasets to improve performance on critical NLP tasks including part-of-speech tagging, sentiment analysis, named entity recognition, and language identification.

Uses Spanglish tweets for pre-training and demonstrates that the adapted model outperforms or matches baseline models across given tasks, with most significant improvements seen for parts-of-speech tagging.

Latent analysis reveals more homogeneous English and Spanish embeddings for language identification tasks, providing insights for future modeling work in multilingual contexts where language alternation is common.

Highlights potential for adapting multilingual language models for code-switched input data to enable advanced utility in globalized and multilingual contexts, addressing real-world language use patterns.

---

- [Babel: Open Multilingual Large Language Models Serving Over 90% of Global Speakers](https://hf.co/papers/2503.00865) - Zhao et al. | 2 Mar, 2025

Introduces Babel, an open multilingual LLM covering the top 25 languages by number of speakers, supporting over 90% of the global population and including many languages neglected by other open multilingual LLMs.

Unlike traditional continue pretraining approaches, Babel expands its parameter count through a layer extension technique that elevates performance ceiling. Two variants are presented: Babel-9B for efficient inference and Babel-83B setting new standards.

Extensive evaluations on multilingual tasks demonstrate superior performance compared to open LLMs of comparable size. Using open-source supervised fine-tuning datasets, Babel-9B-Chat leads among 10B-sized LLMs.

Babel-83B-Chat sets new standards for multilingual tasks, reaching performance levels comparable to commercial models while maintaining open-source accessibility for the research community.

---

- [Cross-Lingual Transfer for Low-Resource Natural Language Processing](https://hf.co/papers/2502.02722) - García-Ferrero | 4 Feb, 2025

Comprehensive thesis addressing cross-lingual transfer learning for low-resource NLP, focusing on sequence labeling tasks such as Named Entity Recognition, Opinion Target Extraction, and Argument Mining through novel methodological approaches.

Introduces T-Projection, a state-of-the-art annotation projection method leveraging text-to-text multilingual models and machine translation systems that significantly outperforms previous annotation projection methods by wide margins.

Develops a constrained decoding algorithm enhancing cross-lingual sequence labeling in zero-shot settings using text-to-text models, and creates Medical mT5, the first multilingual text-to-text medical model.

Demonstrates practical impact through real-world applications while creating open-source resources that facilitate future research in low-resource NLP, advancing both data-based and model-based transfer learning approaches.

---


- [WMT24++: Expanding the Language Coverage of WMT24 to 55 Languages & Dialects](https://hf.co/papers/2502.12404) - Deutsch et al. | 18 Feb, 2025

Extends the WMT24 dataset to cover 55 languages by collecting new human-written references and post-edits for 46 new languages and dialects. The dataset covers four domains: literary, news, social, and speech.

Benchmarks various MT providers and LLMs on the collected dataset using automatic metrics, finding that LLMs are the best-performing MT systems across all 55 languages. The work addresses the need for comprehensive multilingual evaluation frameworks.

The extended dataset provides crucial benchmarking capabilities for assessing LLM performance in diverse linguistic environments, particularly for low-resource languages that are typically underrepresented in existing evaluation frameworks.

Results demonstrate the superior performance of LLMs over traditional MT systems, though the authors recommend future human-based evaluation to confirm these findings across the expanded language coverage.

---

- [Multilingual Machine Translation with Open Large Language Models at Practical Scale: An Empirical Study](https://hf.co/papers/2502.02481) - Cui et al. | 4 Feb, 2025

Systematically explores abilities of open LLMs with less than ten billion parameters for multilingual machine translation tasks, finding that models like Gemma2-9B exhibit impressive multilingual translation capabilities.

Introduces the Parallel-First Monolingual-Second (PFMS) data mixing strategy in continual pretraining to enhance MT performance, presenting GemmaX2-28, a 9B model achieving top-tier performance across 28 languages.

GemmaX2-28 consistently outperforms state-of-the-art models such as TowerInstruct and XALMA, achieving competitive performance with Google Translate and GPT-4-turbo despite having significantly fewer parameters.

The work demonstrates that practical-scale open-source models can achieve commercial-grade translation quality through strategic data mixing and continual pretraining approaches, democratizing access to high-quality multilingual translation.


---

- [Analyzing the Effect of Linguistic Similarity on Cross-Lingual Transfer: Tasks and Experimental Setups Matter](https://hf.co/papers/2501.14491) - Blaschke et al. | 24 Jan, 2025

Analyzes cross-lingual transfer for 266 languages from diverse language families across three popular NLP tasks: POS tagging, dependency parsing, and topic classification to understand how linguistic similarity affects transfer performance.

Findings indicate that the effect of linguistic similarity on transfer performance depends on multiple factors: the specific NLP task, the choice between monolingual or multilingual input representations, and the definition of linguistic similarity itself.

Provides comprehensive empirical evidence challenging previous assumptions about cross-lingual transfer by examining a much wider variety of languages and tasks than prior research, which often focused on small language sets.

The work addresses fundamental questions about optimal cross-lingual data selection strategies, providing crucial insights for practitioners working with low-resource languages in diverse linguistic contexts.

These papers represent some of the most recent and significant contributions to machine translation and cross-lingual NLP research from 2025, covering evaluation methodologies, code-switching applications, comprehensive transfer learning analysis, and practical approaches for multilingual model enhancement.

---



## 2024

---

- [Marco-LLM: Bridging Languages via Massive Multilingual Training for Cross-Lingual Enhancement](https://hf.co/papers/2412.04003) - Ming et al. | 5 Dec, 2024

Addresses LLM limitations with multilingual tasks by introducing Marco-LLM through massive multilingual training for cross-lingual enhancement, collecting substantial multilingual data for low-resource languages and conducting extensive continual pre-training using Qwen2 models.

Demonstrates substantial improvements over state-of-the-art LLMs through comprehensive evaluations on various multilingual benchmarks including MMMLU, AGIEval, Belebele, Flores-200, and XCOPA.

Achieves substantial enhancements in any-to-any machine translation tasks, showing effectiveness in bridging the performance gap between high- and low-resource language capabilities while maintaining strong performance in English and major languages.

Marco-LLM represents a pioneering approach to multilingual LLMs designed to work accurately across various languages, demonstrating dedication to ensuring equitable language representation in large language models.

---

- [MT-Ladder: A Model-Agnostic Framework Boosting LLM-based Machine Translation to the Next Level](https://hf.co/papers/2406.15741) - Feng et al. | 22 Jun, 2024

Develops MT-Ladder, a novel model-agnostic and cost-effective tool to refine the performance of general LLMs for machine translation without requiring unprecedented computing resources or substantial human annotation efforts.

MT-Ladder is trained on pseudo-refinement triplets obtained from existing LLMs without additional human cost, using a hierarchical fine-tuning strategy with an easy-to-hard schema to improve refining performance progressively.

Using Gemma-2B/7B as backbone, MT-Ladder-2B can elevate raw translations to top-tier open-source model levels (refining BigTranslate-13B with +6.91 BLEU and +3.52 COMET for XX-En), while MT-Ladder-7B achieves GPT-4 level performance.

The framework can be seamlessly integrated with any general-purpose LLMs to boost translation performance, providing a practical solution for enhancing existing models without extensive retraining.

---

- [Guiding Large Language Models to Post-Edit Machine Translation with Error Annotations](https://arxiv.org/abs/2404.07851) - Ki & Carpuat | 11 Apr 2024

    Proposes guiding LLMs to automatically post-edit MT by providing external feedback derived from Multidimensional Quality Metric (MQM) annotations of MT quality, varying in granularity from generic improvement requests to fine-grained error span, type and severity feedback.

    * Experiments with prompting LLaMA-2 models show that post-editing MT with feedback reliably improves translation quality based on automatic metrics like BLEU, TER and COMET, although the impact of fine-grained vs generic feedback is limited. Few-shot prompting helps bridge the gap between the 7B and 13B model sizes.

    * Fine-tuning LLaMA-2 to follow instructions with fine-grained feedback leads to stronger improvements in translation quality based on both automatic and human evaluation. Analysis reveals that the fine-tuned models not only fix targeted errors but also generate more natural translations.

    * Results demonstrate that post-editing MT does not require the largest proprietary LLMs and can be done effectively with smaller open-source models like LLaMA-2. Fine-tuning allows the models to exploit fine-grained feedback more effectively compared to prompting.
    ---
  
- [Low-Resource Machine Translation through Retrieval-Augmented LLM Prompting: A Study on the Mambai Language](https://arxiv.org/abs/2404.04809) - Merx et al. | 7 Apr 2024

    Introduces a novel corpus for Mambai, a low-resource Austronesian language spoken in Timor-Leste with around 200,000 native speakers, including bilingual English-Mambai dictionaries, 1,187 parallel sentences from a language manual, and 50 parallel sentences translated by a native speaker.

    * Explores few-shot LLM prompting for English to Mambai translation, strategically selecting parallel sentences and dictionary entries for prompting to enhance accuracy. Finds that including dictionary entries and a mix of sentences retrieved through TF-IDF and semantic embeddings significantly improves translation quality.

    * Reveals stark disparities in translation performance across test sets, with BLEU scores reaching 21.2 on sentences from the language manual used for prompting, but only 4.4 on sentences from the native speaker, underscoring the importance of diverse and representative corpora in assessing MT for low-resource languages.

    * Compares open-source and proprietary LLMs (LlaMa 2 70b, Mistral 8x7B, GPT-4) for Mambai translation, with GPT-4 consistently outperforming other models. Provides insights into few-shot LLM prompting for low-resource MT and releases an initial corpus for the Mambai language.
    ---

  
- [Few-Shot Cross-Lingual Transfer for Prompting Large Language Models in Low-Resource Languages](https://hf.co/papers/2403.06018) - Toukmaji | 9 Mar, 2024

Evaluates methods to adapt LLaMA for prompting in low-resource languages (Kinyarwanda, Hausa, Luganda), considering few-shot prompting, language-adaptive fine-tuning (LAFT), and neural machine translation across multiple tasks.

Finds that despite LAFT's greater computational cost, it's only occasionally optimal for adapting PLMs for prompting, with translate and prompt settings being more compute-efficient and cost-effective for selected low-resource languages.

Results show the prompting method performs better than both translating and LAFT with statistical significance across all tasks and languages when aggregated, challenging assumptions about computational investment and performance outcomes.

The work provides crucial insights for practical deployment of LLMs in low-resource settings, emphasizing efficiency over computational intensity for cross-lingual prompting applications.

---

- [Towards Better Understanding of Cybercrime: The Role of Fine-Tuned LLMs in Translation](https://arxiv.org/abs/2404.01940) - Valeros et al. | 3 Apr 2024

    Proposes using fine-tuned Large Language Models (LLMs) to generate high-quality translations of cybercrime communications from Russian to English that are faster, more accurate, cheaper, and able to capture nuances of the language compared to human translators.

    * Created a dataset from the public Telegram channel of the Russian-speaking hacktivist group NoName057(16) to compare various LLM models and fine-tune the best performing one, GPT-3.5-turbo-0125, adapting it to the specific language used by the cyber-hacktivist group.

    * In a blind test, human translators chose the fine-tuned LLM model's translations as the best in 64.08% of cases compared to the base model. The fine-tuned model respects important elements like URLs, names, links, dates, emojis and captures humor and jargon better than machine translation tools.

    * Using the fine-tuned LLM model for translation can reduce costs by a factor of 430 to 23,000 compared to human translators, making it feasible to translate and analyze large volumes of cybercrime communications in a timely manner to understand the tactics, motivations and alliances of threat actors.
    ---
- [A Paradigm Shift: The Future of Machine Translation Lies with Large Language Models](https://arxiv.org/abs/2305.01181) - Lyu et al. | Updated 2 Apr 2024 (Oct)

    Explores several promising research directions for Machine Translation (MT) using Large Language Models (LLMs), including long-document translation, stylized translation, interactive translation, Translation Memory (TM) based MT, multi-modal translation, and new evaluation paradigms for MT using LLMs.

    * Discusses the importance and challenges of privacy-preserving in MT using LLMs, and proposes basic privacy-preserving methods like anonymizing sensitive information in the textual input before passing it to LLMs.

    * Identifies additional directions such as personalized MT, which can enable customized translations tailored to each user's preferences and needs, and low-resource MT, where LLMs can potentially compensate for the lack of genuine training data.

    * Presents experimental results and analysis of various LLMs' performances in translation tasks, focusing on Chinese-to-English translations, and finds that advanced LLMs like GPT-3.5 and GPT-4 achieve strong performance on various domains and even surpass some specialized MT systems.
    ---

## March 2024

- [Going Beyond Word Matching: Syntax Improves In-context Example Selection for Machine Translation](https://arxiv.org/abs/2403.19285) - Tang et al. | 28 Mar 2024

    Proposes a syntax-based in-context example selection method for machine translation (MT) that computes the syntactic similarity between dependency trees using Polynomial Distance to select the most syntactically similar examples for in-context learning, improving LLMs' MT performance on 11 out of 12 translation directions.

    * Presents a simple but effective ensemble strategy that combines examples selected by both word-level criteria (like BM25) and the proposed syntax-level criteria, taking advantage of both superficial word overlapping and deep syntactic similarity.

    * Experimental results between English and 6 common languages show that the proposed syntax-based and ensemble methods obtain the highest COMET scores on 11 out of 12 translation directions, indicating that injecting syntax information during in-context example selection is helpful for MT.

    * Calls on the NLP community to pay more attention to syntactic knowledge for syntax-rich tasks like MT, and not ignore the significance of syntax when embracing large language models in the era of in-context learning.
    ---
- [Building Accurate Translation-Tailored LLMs with Language Aware Instruction Tuning](https://arxiv.org/abs/2403.14399) - Zan et al. | 21 Mar 2024

    Proposes a two-stage fine-tuning algorithm to improve the instruction-following ability, especially the translation direction, of large language models (LLMs) for zero-shot translation. The first stage elicits basic translation capabilities, while the second stage uses unlikelihood loss on instruction-conflicting samples.

    * Creates instruction-conflicting samples in the second stage by randomly replacing the translation directions with a wrong one within the instruction, and introduces an unlikelihood loss to learn from these samples, guiding the LLM to produce translations in the correct target language.

    * Experiments on IWSLT and WMT benchmarks spanning 16 zero-shot directions show that, compared to translation fine-tuned LLaMA, the proposed method effectively reduces off-target translation ratio (average -53.3%), improving translation quality by +5.7 SacreBLEU and +16.4 BLEURT on average.

    * Analysis shows that the method preserves the model's supervised translation ability and general task performance on AlpacaEval, and is effective with larger LLMs and different amounts of translation data. The off-target translation problem is significantly mitigated by improving the LLM's ability to follow language-specific translation instructions.
    ---
- [Is Translation All You Need? A Study on Solving Multilingual Tasks with Large Language Models](https://arxiv.org/abs/2403.10258) - Liu et al. | 15 Mar 2024

    Conducts a comprehensive assessment of Large Language Models (LLMs) across diverse multilingual tasks, including traditional NLP challenges, real user queries, and culture-specific tasks, to evaluate the effectiveness of translation-based methods for non-English tasks.

    * Finds that while translation serves as a straightforward and initially effective strategy to enhance the performance of English-centric LLMs on non-English tasks, it falls short of being optimal, especially for tasks heavily reliant on language-specific nuances.

    * Observes that for culture-related tasks that need deep language understanding, prompting in the native language proves to be more promising since it can capture the nuances related to culture and language, suggesting that directly training LLMs in specific languages can yield superior results by eliminating potential translation errors.

    * Advocates for the prioritization of research and development efforts towards the creation of strong multilingual LLMs, rather than just English-centric LLMs, to address the challenges of multilingual tasks effectively, especially for language-dependent tasks that require cultural and contextual understanding.
    ---
- [Eliciting the Translation Ability of Large Language Models via Multilingual Finetuning with Translation Instructions](https://arxiv.org/abs/2305.15083) - Li et al. | 14 Mar 2024

    Proposes Multilingual Finetuning with Translation Instructions (mFTI) to better elicit the translation ability of multilingual LLMs. By finetuning LLMs on a mixture of 1000 sentences per language pair, mFTI achieves better performance than 8-shot in-context learning.

    * mFTI helps LLMs better follow translation instructions by introducing more language pairs and monolingual sentences. It also enhances direct language alignment by learning from pivot language pairs, improving performance even on language pairs unseen during instruction finetuning.

    * The translation performance of each language after mFTI largely depends on its similarity to English and the amount of data used in LLM pretraining. This suggests taking language relationships into account when collecting pretraining data for multilingual LLMs.

    * Analysis reveals remaining challenges in zero-shot LLM-based machine translation, including over/under translation, oscillatory hallucination, and mistranslations caused by incorrect alignments. Future work should focus on acquiring more language knowledge during pretraining and designing regularization to mitigate these issues.
    ---
- [ACT-MNMT: Auto-Constriction Turning for Multilingual Neural Machine Translation](https://arxiv.org/abs/2403.06745) - Dai et al. | 11 Mar 2023

    Proposes an Auto-Constriction Turning mechanism that automatically constructs a constrained template in the target side by adding trigger tokens to guide LLMs and reduce off-target translations.

    * The trigger tokens consist of common tokens capturing shared information across translation directions and specific tokens capturing target language information. They can be freely arranged to represent different task semantics.

    * Experiments on WMT test sets demonstrate that ACT-MNMT substantially improves performance across multiple translation directions and reduces off-target phenomena compared to instruction fine-tuning baselines.

    * ACT-MNMT exhibits strong scalability and robustness, with the ability to generalize to different model sizes. Providing task execution information in the constrained template helps guide the model's generation and improves performance.
    ---
- [Improving LLM-based Machine Translation with Systematic Self-Correction](https://arxiv.org/abs/2402.16379) - Feng et al. | 4 Mar 2024

    Proposes TER, a systematic LLM-based self-correcting translation framework consisting of Translate, Estimate, and Refine modules. TER uses a single LLM to generate translations, estimate their quality, and refine them based on the estimation feedback.

    * Demonstrates that TER significantly improves translation quality across various language pairs, for both high-resource and low-resource languages, as well as English-centric and non-English-centric translations. TER outperforms existing post-editing methods in both metric scores and human preference.

    * Reveals that the estimation module is a critical bottleneck in the self-correction process. Few-shot prompting for estimation generally yields better results than zero-shot prompting. The quality of estimation directly impacts the effectiveness of the final corrections.

    * Finds that LLMs exhibit diverse translation and estimation capabilities across different language pairs. The translation and estimation abilities tend to be consistent for some language pairs, while the error correction ability can complement them in others.

    * Provides practical insights for leveraging the TER framework, such as the importance of carefully designing estimation prompts, the potential of using feedback alone for correction, and the impact of different LLMs on the correction execution rate.
    ---
- [Building Accurate Translation-Tailored LLMs with Language Aware Instruction Tuning](https://arxiv.org/abs/2403.14399) - Zan | Mar 2024 

    A two-stage fine-tuning algorithm improves LLMs' instruction-following ability, reducing off-target translations and enhancing translation quality across 16 zero-shot directions, while preserving general task performance.
 
- [Scaling Behavior of Machine Translation with Large Language Models under Prompt Injection Attacks](https://arxiv.org/abs/2403.09832) - Sun & Miceli-Barone | Mar 2024 

    Larger LLMs may become more susceptible to successful prompt injection attacks in machine translation tasks, an instance of the Inverse Scaling phenomenon, as studied on a new multi-lingual benchmark dataset.

## Jan/Feb 2024

- [Teaching Large Language Models an Unseen Language on the Fly](https://arxiv.org/abs/2402.19167) - Zhang et al. | Feb 2024 

    DiPMT++ framework adapts LLMs to unseen languages through in-context learning, significantly enhancing translation performance for low-resource languages and aiding in the preservation of linguistic diversity.

- [Adapting Large Language Models for Document-Level Machine Translation](https://arxiv.org/abs/2401.06468) - Wu et al. | Feb 2024 

    Adapting LLMs for document-level machine translation can surpass GPT-4 in some cases, but off-target translation issues persist. The study explores prompt strategies, fine-tuning methods, and provides in-depth analysis.

- [Contrastive Preference Optimization: Pushing the Boundaries of LLM Performance in Machine Translation](https://arxiv.org/abs/2401.08417) - Xu et al. | Jan 2024 

     Contrastive Preference Optimization (CPO) trains LLMs to avoid generating adequate but imperfect translations, resulting in ALMA-R, which matches or exceeds WMT competition winners and GPT-4 on recent test datasets.

## 2023

- [Multilingual Machine Translation with Large Language Models: Empirical Results and Analysis](https://arxiv.org/abs/2304.04675) - Zhu et al. | 29 Oct 2023

    Evaluates the multilingual translation capabilities of eight popular Large Language Models (LLMs) on 102 languages and 606 translation directions, comparing their performance with strong supervised baselines like NLLB and Google Translator.

    * Finds that the multilingual translation capabilities of LLMs are continually improving, with GPT-4 achieving the highest average BLEU and COMET scores and outperforming NLLB in 40.91% of English-centric translation directions. However, LLMs still lag behind commercial translation systems, especially for low-resource languages.

    * Discovers that LLMs exhibit new working patterns when used for machine translation, such as the ability to translate even with unreasonable instructions when given in-context exemplars, the potential of using cross-lingual exemplars for low-resource translation, and the resource-efficient acquisition of translation ability.

    * Provides practical insights for leveraging LLMs in machine translation tasks, such as the importance of carefully designing in-context templates, the potential of using cross-lingual exemplars for low-resource languages, and the need to consider data leakage issues when evaluating LLMs on public datasets.

    * Highlights the promising future of LLMs in multilingual machine translation, as they can learn to translate in a resource-efficient way and generate moderate translations even for unseen languages, indicating the potential for aligning multiple languages with unsupervised data.
    ---
- [Adaptive Machine Translation with Large Language Models](https://arxiv.org/abs/2301.13294) - Moslem et al. | May 2023 

    LLMs' in-context learning capabilities can improve real-time adaptive MT by adapting to domain-specific sentence pairs and terminology, surpassing strong encoder-decoder MT systems, especially for high-resource languages.

- [Optimizing Machine Translation through Prompt Engineering: An Investigation into ChatGPT's Customizability](https://arxiv.org/abs/2304.04763) - Yamada | Apr 2023 

    Integrating the purpose and target audience into prompts can modify ChatGPT's translations, generally enhancing quality by industry standards and demonstrating the practical application of the "good translation" concept.
