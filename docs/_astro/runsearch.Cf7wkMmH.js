const BUTTON_SELECTOR = '#docsearch button, #docsearch .DocSearch-Button';
let docsearchInstance = null;

function waitForButton() {
  return new Promise((resolve) => {
    const existing = document.querySelector(BUTTON_SELECTOR);
    if (existing) {
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const target = document.querySelector(BUTTON_SELECTOR);
      if (target) {
        observer.disconnect();
        resolve(target);
      }
    });

    observer.observe(document.getElementById('docsearch') || document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export async function initSearch(lang, searchText) {
  if (docsearchInstance) {
    return docsearchInstance;
  }

  if (typeof window === 'undefined' || typeof window.docsearch !== 'function') {
    console.warn('[DocSearch] docsearch library is not ready');
    return null;
  }

  const translationsZh = {
    button: {
      buttonText: '搜索',
      buttonAriaLabel: '搜索',
    },
    modal: {
      searchBox: {
        resetButtonTitle: '清除搜索关键字',
        resetButtonAriaLabel: '清除搜索关键字',
        cancelButtonText: '取消',
        cancelButtonAriaLabel: '取消',
      },
      startScreen: {
        recentSearchesTitle: '最近搜索',
        noRecentSearchesText: '当前没有搜索历史记录',
        saveRecentSearchButtonTitle: '保存本次搜索',
        removeRecentSearchButtonTitle: '从搜索历史中移除',
        favoriteSearchesTitle: '收藏夹',
        removeFavoriteSearchButtonTitle: '从收藏夹移除',
      },
      errorScreen: {
        titleText: '无法获取结果',
        helpText: '请检查网络连接',
      },
      footer: {
        selectText: '选择',
        selectKeyAriaLabel: '选择',
        navigateText: '切换',
        navigateUpKeyAriaLabel: 'Arrow up',
        navigateDownKeyAriaLabel: 'Arrow down',
        closeText: '退出',
        closeKeyAriaLabel: 'Escape key',
        searchByText: '引擎支持',
      },
      noResultsScreen: {
        noResultsText: '无法找到对应结果',
        suggestedQueryText: '可以尝试搜索如下内容',
        reportMissingResultsText: '确认本次搜索应该返回内容？',
        reportMissingResultsLinkText: '请告知我们',
      },
    },
  };

  const translationsEn = {
    button: {
      buttonText: 'Search',
      buttonAriaLabel: 'Search',
    },
    modal: {
      searchBox: {
        resetButtonTitle: 'Clear the query',
        resetButtonAriaLabel: 'Clear the query',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: 'Cancel',
      },
      startScreen: {
        recentSearchesTitle: 'Recent',
        noRecentSearchesText: 'No recent searches',
        saveRecentSearchButtonTitle: 'Save this search',
        removeRecentSearchButtonTitle: 'Remove this search from history',
        favoriteSearchesTitle: 'Favorite',
        removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
      },
      errorScreen: {
        titleText: 'Unable to fetch results',
        helpText: 'You might want to check your network connection.',
      },
      footer: {
        selectText: 'to select',
        selectKeyAriaLabel: 'Enter key',
        navigateText: 'to navigate',
        navigateUpKeyAriaLabel: 'Arrow up',
        navigateDownKeyAriaLabel: 'Arrow down',
        closeText: 'to close',
        closeKeyAriaLabel: 'Escape key',
        searchByText: 'Search by',
      },
      noResultsScreen: {
        noResultsText: 'No results for',
        suggestedQueryText: 'Try searching for',
        reportMissingResultsText: 'Believe this query should return results?',
        reportMissingResultsLinkText: 'Let us know.',
      },
    },
  };

  const docsearch = window.docsearch;
  const result = docsearch({
    appId: 'MVXKD4F4BR',
    apiKey: 'a1b4111c3de8b9f60eeca6da001711da',
    indexName: 'fatbobman',
    container: '#docsearch',
    insights: true,
    placeholder: searchText,
    maxResultsPerGroup: 50,
    translations: lang === 'zh' ? translationsZh : translationsEn,
    searchParameters: {
      facetFilters: [`lang:${lang}`],
      hitsPerPage: 50,
    },
  });

  // Mark as initialized regardless of return value (docsearch may return undefined)
  docsearchInstance = result || true;

  await waitForButton();

  // Add a small delay to ensure DocSearch event listeners are fully bound
  await new Promise(resolve => setTimeout(resolve, 100));

  return docsearchInstance;
}

export async function openSearch(lang, searchText) {
  let instance;
  try {
    instance = await initSearch(lang, searchText);

    if (!instance) {
      console.error('[DocSearch] Failed to initialize, cannot open search');
      return null;
    }
  } catch (error) {
    console.error('[DocSearch] Error during initialization:', error);
    return null;
  }

  // Use requestAnimationFrame to ensure DOM is fully rendered and event listeners are bound
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  // Try multiple methods to open the search modal
  // Method 1: Trigger keyboard shortcut (most reliable for autofocus)
  const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  const keyboardEvent = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    keyCode: 75,
    which: 75,
    metaKey: isMac,
    ctrlKey: !isMac,
    bubbles: true,
    cancelable: true
  });

  document.dispatchEvent(keyboardEvent);

  // Method 2: Fallback to button click if keyboard shortcut doesn't work
  setTimeout(() => {
    const modal = document.querySelector('.DocSearch-Modal');

    if (!modal || !modal.offsetParent) {
      const button = document.querySelector(BUTTON_SELECTOR);
      if (button) {
        button.click();
      }
    }
  }, 100);

  return instance;
}
