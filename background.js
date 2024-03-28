const apiUrl = 'https://api.anthropic.com/v1/complete';
let apiKey = '';



function onGot(item) {
  if (item.apiKey) {
    apiKey = item.apiKey;
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// Load the API key from storage
let getting = browser.storage.sync.get("apiKey");
getting.then(onGot, onError);



async function processText(prompt, instruction) {
  try {
    // Set the browser border color to red
    await browser.theme.update({
      colors: {
        frame: '#808080',
        tab_background_text: '#808080',
        toolbar: '#808080',
        bookmark_text: '#808080'
      }
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        prompt: `${instruction}\n\nHuman: ${prompt}\n\nAssistant:`,
        model: 'claude-instant-v1',
        max_tokens_to_sample: 750
      })
    });

    const result = await response.json();
    const generatedText = result.completion;
    await navigator.clipboard.writeText(generatedText);
    console.log('Generated text copied to clipboard:', generatedText);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Reset the browser border color
    await browser.theme.reset();
  }
}


browser.contextMenus.create({
  id: "useSelectionAsPrompt",
  title: "Use the selected text as a prompt",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "paraphraseSelection",
  title: "Paraphrase the selected text",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "summarizeSelection",
  title: "Summarize the selected text",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "useClipboardAsPrompt",
  title: "Use the text from the clipboard as a prompt",
  contexts: ["all"]
});

browser.contextMenus.create({
  id: "paraphraseClipboard",
  title: "Paraphrase the text in the clipboard",
  contexts: ["all"]
});

browser.contextMenus.create({
  id: "summarizeClipboard",
  title: "Summarize the text in the clipboard",
  contexts: ["all"]
});


browser.contextMenus.onClicked.addListener(async (info, tab) => {
  let prompt = '';

  if (info.menuItemId === "useSelectionAsPrompt" || info.menuItemId === "paraphraseSelection" || info.menuItemId === "summarizeSelection") {
    prompt = info.selectionText;
  } else if (info.menuItemId === "useClipboardAsPrompt" || info.menuItemId === "paraphraseClipboard" || info.menuItemId === "summarizeClipboard") {
    prompt = await navigator.clipboard.readText();
  }

  if (prompt) {
    if (info.menuItemId === "useSelectionAsPrompt" || info.menuItemId === "useClipboardAsPrompt") {
      processText(prompt, "Use the following text as a prompt");
    } else if (info.menuItemId === "paraphraseSelection" || info.menuItemId === "paraphraseClipboard") {
      processText(prompt, "Paraphrase the following text");
    } else if (info.menuItemId === "summarizeSelection" || info.menuItemId === "summarizeClipboard") {
      processText(prompt, "Summarize the following text");
    }
  } else {
    console.log('No text selected or in the clipboard.');
  }
});
