import * as core from '@actions/core';
import axios from 'axios';

async function deploymentApi() {
  try {
    // Get inputs from the GitHub Action metadata
    const apiKey = core.getInput('apiKey');
    const changes = core.getInput('changes');
    const revision = core.getInput('revision');
    const releaseStage = core.getInput('releaseStage') || 'production';
    const projectId = core.getInput('projectId');
    const user = core.getInput('user');
    const apiUrl = 'https://api.atatus.com/v2/projects';

    // Prepare the request payload
    const payload = {
      api_key: apiKey,
      revision,
      release_stage: releaseStage,
      changes,
      user
    };

    // Make the API request
    const response = await axios.post(`${apiUrl}/${projectId}/deployments`, payload);

    // Log and set output for the GitHub Action
    console.log('Deployment successful:', response.data);
    core.setOutput('response', response.data);
  } catch (error: unknown) {
    // Narrow the type of error to 'Error' before accessing message
    if (error instanceof Error) {
      console.error('Error during deployment:', error.message);
      core.setFailed(`Deployment failed: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
      core.setFailed('Deployment failed due to an unknown error');
    }
  }
}

deploymentApi();
