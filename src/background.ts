// XのURLから寿司打のスコアを抽出して保存する
try {
  chrome.webNavigation.onCompleted.addListener(async (details) => {
    const { tabId, url } = details

    if (url.indexOf("https://x.com/") > -1) {
      const decodeUrl = decodeURIComponent(url).replace(/,/g, "")
      const date = new Date().toLocaleDateString("sv-SE")
      const results = decodeUrl
        .match(/\d+(\.\d+)?/g)!
        .map((result) => parseFloat(result))

      if (results.length === 4) {
        await chrome.storage.local.set({
          [tabId]: {
            date: date,
            course: results[0],
            score: results[1],
            rate: results[2],
            miss: results[3]
          }
        })
      } else {
        await chrome.storage.local.set({
          [tabId]: {
            date: date,
            course: results[0],
            score: results[3],
            rate: results[4],
            miss: results[5]
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
      url: "chrome-extension://plolmhakkepfofnfjnhaeohfhoicojha/tabs/index.html"
    })
  })
} catch (error) {
  console.error(error)
}
