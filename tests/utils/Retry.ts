export class Retry {
  /**
   * Retries an asynchronous action multiple times with a delay between attempts.
   *
   * @param fn          Asynchronous function to execute
   * @param maxRetries  Maximum number of retry attempts (default: 3)
   * @param delayMs     Delay in ms between each attempt (default: 1000ms)
   */
  static async run<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
  ): Promise<T> {

    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔁 Retry attempt ${attempt}/${maxRetries}`);
        return await fn();
      } catch (err) {
        lastError = err;
        console.warn(`⚠️ Attempt ${attempt} failed:`, err);

        if (attempt < maxRetries) {
          await new Promise((res) => setTimeout(res, delayMs));
        }
      }
    }

    console.error("❌ All retry attempts failed.");
    throw lastError;
  }
}