# Learning AI

An AI coaching platform that helps business professionals get better results from AI tools like ChatGPT, Claude, and Gemini.

## Features

- **Task Planner** - Describe what you're trying to accomplish and get a step-by-step plan showing where AI can help
- **Prompt Generator** - Build expert prompts from simple inputs using the PCTR framework
- **Prompt Refiner** - Paste your existing prompts and get actionable feedback on how to improve them
- **Workflow Library** - Pre-built workflows for common business tasks (financial analysis, marketing, operations)
- **Learning Modules** - Understand the fundamentals of working effectively with AI

## Getting Started

### Prerequisites

- Node.js 18+
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lgoyal13/Learning-AI.git
   cd Learning-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Add your Gemini API key to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Testing**: Vitest

## Project Structure

```
/app          - Page components
/components   - Reusable UI components
/services     - API integrations (Gemini)
/data         - Role profiles, workflows, prompts
/lib          - Utilities
/docs         - Project documentation
```

## Contributing

Contributions are welcome! Please read the documentation in `/docs` to understand the project architecture.

## License

MIT License - see [LICENSE](LICENSE) for details.
