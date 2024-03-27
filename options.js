document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');

  
  function getKey(result) {
    apiKeyInput.value = result.apiKey || "None";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  // Load the saved API key
  let getting = browser.storage.sync.get("apiKey");
  getting.then(getKey, onError);



  // Save the API key when the save button is clicked
  saveButton.addEventListener('click', () => {
	  browser.storage.sync.set({
      apiKey: apiKeyInput.value
    });
    apiKeyInput.value = 'Saved';	
    console.log('API key saved.');
  });
});
