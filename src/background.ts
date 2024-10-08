// XのURLから寿司打のスコアを抽出して保存する
try {
  chrome.webNavigation.onCompleted.addListener(async (details) => {
    const { tabId, url } = details

    if (url.indexOf("https://x.com/") > -1) {
      const decodeUrl = decodeURIComponent(url).replace(/,/g, "")
      const dateTime = new Date().toLocaleString("sv-SE")
      const results = decodeUrl
        .match(/\d+(\.\d+)?/g)!
        .map((result) => parseFloat(result))

      if (results.length === 4) {
        await chrome.storage.local.set({
          [tabId]: {
            cost: results[1],
            course: results[0],
            dateTime: dateTime,
            miss: results[3],
            rate: results[2]
          }
        })
      } else {
        await chrome.storage.local.set({
          [tabId]: {
            cost: results[3] - results[0],
            course: results[0],
            dateTime: dateTime,
            miss: results[5],
            rate: results[4]
          }
        })
      }
    }
  })
} catch (error) {
  console.error(error)
}

// 拡張機能のアイコンがクリックされたときに指定のページを開く
try {
  chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({
      url: "chrome-extension://affclopehohpenmijjbdhljgpbcpkmdi/tabs/index.html"
    })
  })
} catch (error) {
  console.error(error)
}
