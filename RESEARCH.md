## April 2024

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