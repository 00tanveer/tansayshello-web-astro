---
title: "Programming #2 - Build a simple RAG application PART-1"
description: "I have made a simple naive retrieval-augmented generation (RAG) application created to respond to queries about based on facts about cats in a text file."
pubDate: 'Oct 6 2025'
heroImage: '/programming-2-simple-rag-bot-part-1.png'
---
I have made a simple naive retrieval-augmented generation (RAG) application created to respond to queries about based on facts about cats in a text file. Go to the [Github repo](https://github.com/00tanveer/simple-rag-vector-db) for instructions on running the project or even contributing to it if you have cool ideas. You may embarrass me for mistakes 😁 This is level 1/100 in my deep learning journey. There's a long way to go and I absolutely love the uphill climb.

# PROJECT GOALS
The primary goals for this project were:

1. Build without frameworks to learn the underlying mechanisms behind powering a RAG project. Abstractions will get in the way of my learning now. This will allow me to build a lot of divergent pathways in my brain around RAG.
2. Make the project sufficiently modular so that the fundamental building blocks of the project can be tested in isolation and improved upon.
3. Use as less cloud services as possible to learn how to build RAG apps on a local server.

# BUILDING BLOCKS OF THE PROJECT
All RAG applications have broadly these fundamental building blocks - Data pipeline, Knowledge representation, Context/knowledge retrieval and Language generation. What you see below are my implementations of the blocks in this project.

1. <strong>Data layer</strong> - storing data on cat facts in a `postgres` database on Supabase and using `pgvector` as a vector extension in postgres to store vector embeddings
2. <strong>Knowledge representation</strong> - Indexing fixed-size chunks with a local Ollama embedding model `mxbai-embed-large:latest` and storing the embeddings in my postgres database table
3. <strong>Retrieval layer</strong> - basic cosine similarity search with top-n ranking
4. <strong>Generation layer</strong> - generation with a local Ollama embedding model gemma3:4b with simple system and user prompts

# PROVENANCE
The previous version of this project had the following implementations of the building blocks mentioned above:

1. <strong>Data layer</strong> - local text file and an in-memory Python tuple to store vector embeddings
2. <strong>Knowledge representation</strong> - Indexing fixed-size chunks with a local Ollama embedding model mxbai-embed-large:latest
3. <strong>Retrieval layer</strong> - basic cosine similarity search with top-n ranking
4. <strong>Generation layer</strong> - generation with a local Ollama embedding model gemma3:4b with simple system and user prompts

# RAG TESTING FRAMEWORK
## RAG EVALUATION
We can view RAG evaluation as a tuple of "what is being evaluated?" vs "what is it being evaluated against?". There are different dimensions of this evaluation routine, written as separate evaluators. An LLM (Ollama 'gemma3:4b') was used as a judge for assessments. In this application, you can see for yourself how effective it was *or not*.

1. <strong>Correctness</strong> - Response vs Reference answer (how accurate the response is, agnostic of context) Goal: Measure "how similar/correct is the RAG chain answer relative to a ground-truth answer"
2. <strong>Relevance</strong> - Response vs Input Goal: Measure "how well does the RAG chain answer address the input question"
3. <strong>Groundedness</strong> - Response vs retrieved docs Goal: Measure "to what extent does the generated response agree with the retrieved context"
4. <strong>Retrieval Relevance</strong> - Retrieved docs vs input Goal: Measure "how relevant are my retrieved docs/results for this query
5. <strong>Context recall</strong> - Retrieved docs vs Reference docs: Measure "how many of the correct docs are retrieved as context"

![evaluating a RAG bot](/evaluating-rag.png "From Langchain - Evaluating a RAG bot")

# NEXT STEPS
1. Add more examples to better test the full scope of the application.
2. Improve context recall by testing different embedding strategies (maybe make embedding modular so that I can swap in and out different embedding methods and test them in isolation while controlling other variables)
3. Latency measurement (now it takes way too long to generate locally on my machine, want to see if I can bring the time down)
4. Throughput measurement (want to measure how many responses per unit time this application can handle)
5. Build my own custom RAG tests dashboard
6. This application produces inconsistent responses which also contain some hallucinations in the generation phase. I need to have better parameters for more determinism (ex - lower temperature, fixed seed values, etc). The prompt instruction plays the biggest role in deterministic answers. I need to come up with a super strong template.