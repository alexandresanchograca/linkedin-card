async function getActiveTabId() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.length ? tabs[0].url : "https://www.linkedin.com/";
}

export default getActiveTabId;