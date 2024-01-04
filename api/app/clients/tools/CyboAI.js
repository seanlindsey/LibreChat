const Cybo = require('cyboai/cyboai');
const description_for_model = require('cyboai/gobals');
const { Tool } = require('langchain/tools');
const { logger } = require('~/config');

class CyboAI extends Tool {
  constructor(fields = {}) {
    super();
    this.apiKey = fields.CYBO_API_KEY || this.getApiKey();
    this.cyboSearch = undefined;
  }

  name = 'cybo';
  description = 'Use \'Cybo AI\' to search for businesses and learn more about them.';
  description_for_model = description_for_model;

  getApiKey() {
    const apiKey = process.env.CYBO_API_KEY || '';
    if (!apiKey) {
      throw new Error('Missing CYBO_API_KEY environment variable.');
    }
    return apiKey;
  }

  getCyboSearch() {
    if (!this.cyboSearch) {
      this.cyboSearch = new Cybo(); // Create an instance of Cybo
    }
    return this.cyboSearch;
  }

  resultsToReadableFormat(results) {
    let output = `Results: ${results.length}\n`;
    // ... Format results
    return output;
  }

  async _call(input) {
    try {
      const cyboInstance = this.getCyboSearch();
      return cyboInstance.search(input); // Use the search method

      // ... Process any additional logic or return results
      // For now, it just logs the query to a file
    } catch (error) {
      logger.error('[CyboAI]', error);
      return `There was an error searching Cybo. ${error}`;
    }
  }
}

module.exports = CyboAI;
