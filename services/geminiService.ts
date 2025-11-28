// This service has been disabled as per requirements.
// No external API calls are made.

export const generateAIResponse = async (
  prompt: string,
  systemInstruction?: string
): Promise<string> => {
  return "AI Service Disconnected.";
};

export const checkPII = (text: string): boolean => {
  return false;
};