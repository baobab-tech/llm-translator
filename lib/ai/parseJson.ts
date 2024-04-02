/**
 * Make sure to only get the JSON object from the string from a LLM completion
 * @TODO: Yeah I know LangChain and Llamaindex both have output parsers, need to use that.
 * @param input string
 * @returns JSON Object or Array
 */
export function parseJSONFromString(input: string): any {
    // Regular expression to find a JSON object or array
    const regex = /(\{.*\}|\[.*\])/s;
  
    // Extract JSON string using the regular expression
    const match = input.match(regex);
  
    // Check if a match was found
    if (match) {
        // try removing any comment lines that have // in them by first breaking by line and trim then line starts with //
        let cleaned = match[0].split("\n").map((line) => line.trim()).filter((line) => !line.startsWith("//")).join("\n");
        // remove all new lines and then replace any  tailing commas such as ,} an ,]
        cleaned = cleaned.replace(/\n/g, "").replace(/,(\s*[\]}])/g, "$1");
        console.log("Cleaned JSON:", cleaned);
        try {
            // Parse and return the JSON object/array
            return JSON.parse(cleaned);
        } catch (error) {
            // Handle parsing error (invalid JSON)
            
            console.error("Invalid JSON:", error, "Input:", input);
            return null;
        }
    } else {
        // No JSON object/array found
        console.log("No JSON object or array found in the string.", input);
        return null;
    }
  }
  