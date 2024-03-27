document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');

  // Load the saved API key
  browser.storage.sync.get('apiKey', (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });

  // Save the API key when the save button is clicked
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value;
    browser.storage.sync.set({ apiKey }, () => {
      console.log('API key saved.');
    });
  });
});
