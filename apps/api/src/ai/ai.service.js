// every module calls this ai service instead of calling the ai-service-provider directly
// so we can change the provider from lets say gemini to openai by only creating a new provider and using it instead inside this ai.service

// here we simply use all the services we created.
// the flow is as:
// prompt made using user's goal, level and duration using promptBuilder -> passed to contentGenerator tp generate a repose -> the response is validated and cleaned and then returned

import { generateContent } from "./providers/gemini.provider.js";
import { buildRoadmapPrompt } from "./prompts/roadmap.prompt.js";
import { parseRoadmap } from "./parsers/roadmap.parser.js";

export const generateRoadmap = async ({ goal, level, duration }) => {
  const prompt = buildRoadmapPrompt({
    goal,
    level,
    duration,
  });

  const response = await generateContent(prompt);

  return parseRoadmap(response);
};
