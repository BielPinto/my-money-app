export function selectTab(tabId) {
    //console.log("selectTab")
    return {
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

export function showTabs(...tabIds) {
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true)
  //  console.log("showTabs")
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}