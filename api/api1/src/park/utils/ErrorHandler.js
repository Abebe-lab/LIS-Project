/* 
 * @param {Function} func - The function or code block to execute.
 * @returns {Object} - Returns an object containing either a `result` or an `error`.
 */
const tryCatchWrapper = async (func) => {
    try {
      const result = await func(); // Execute the function
      return { result };
    } catch (error) {
      return { error }; // Return error in case of failure
    }
  };
export default tryCatchWrapper;
  //usage example
    //const { result, error } = await tryCatchWrapper(exampleFunction);
    /*if (error) {
        console.error("Error:", error.message);
      } else {
        console.log("Result:", result);
      }*/