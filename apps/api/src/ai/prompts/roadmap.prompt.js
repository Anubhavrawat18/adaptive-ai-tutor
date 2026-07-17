export const buildRoadmapPrompt = ({ goal, level, duration }) => {
  return `
You are an expert educator and curriculum designer.

Generate a personalized learning roadmap.

Goal:
${goal}

Current Level:
${level}

Target Duration:
${duration}

Return ONLY valid JSON.

The JSON must strictly follow this format:

{
  "title": "",
  "description": "",
  "sections": [
    {
      "title": "",
      "description": "",
      "tasks": [
        {
          "title": "",
          "description": "",
          "estimatedHours": 0,
          "taskType": "",
          "resources": [
            {
              "title": "",
              "url": "",
              "type": ""
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- No code fences.
- Create logical learning sections.
- Keep tasks in learning order.
- Suggest high-quality learning resources.
- Estimated hours should be realistic.
`;
};
