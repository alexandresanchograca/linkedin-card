async function getActiveDoc() {
  let foo = await loadHTML();
  const parser = new DOMParser();
  const doc = parser.parseFromString(foo, "text/html");
  return doc;
}

async function getActiveTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs?.length ? tabs[0].id : 0;
}

async function loadHTML() {
  try {
    const activeTabId = await getActiveTabId();

    const result = await chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      func: DOMtoString,
      args: ["body"],
    });

    if (!result?.length) throw new Error("No result found!");

    return result[0].result;
  } catch (err) {
    console.log(err.message);
  }
}

function DOMtoString(selector) {
  if (selector) {
    selector = document.querySelector(selector);
    if (!selector) return "ERROR: querySelector failed to find node";
  } else {
    selector = document.documentElement;
  }
  return selector.outerHTML;
}

export default getActiveDoc;
