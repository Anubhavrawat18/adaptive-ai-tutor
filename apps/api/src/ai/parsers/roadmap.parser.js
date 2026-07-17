// What this parse does:
// Clean Gemini's response.
// Parse JSON.
// Validate using Zod.
// Throw a meaningful error if anything fails.

import { roadmapSchema } from "../schemas/roadmap.schema.js";
import { ApiError } from "../../utils/ApiError.js";

export const parseRoadmap = (response) => {
  try {
    let cleanedResponse = response.trim();

    // Remove ```json ... ``` wrappers if Gemini returns them
    cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*/i, "");

    cleanedResponse = cleanedResponse.replace(/```$/, "");

    const parsedJSON = JSON.parse(cleanedResponse);

    return roadmapSchema.parse(parsedJSON);
  } catch (error) {
    throw new ApiError(
      500,
      `Failed to parse roadmap response: ${error.message}`,
    );
  }
};
