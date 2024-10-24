if (typeof window !== 'undefined') {
  const docsearch = window.docsearch;
  const docsearchContainer = document.getElementById('docsearch-container-data');
  const lang = docsearchContainer.dataset.lang;
  const searchText = docsearchContainer.dataset.searchtext;
  const translations_zh = {
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
  const translations_en = {
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
  const translation = lang === 'zh' ? translations_zh : translations_en;
  docsearch({
      appId: 'MVXKD4F4BR',
      apiKey: 'a1b4111c3de8b9f60eeca6da001711da',
      indexName: 'fatbobman',
      container: '#docsearch',
      insights: true,
      placeholder: searchText,
      maxResultsPerGroup: 50,
      // https://docsearch.algolia.com/docs/api/
      translations: translation,
      searchParameters: {
          facetFilters: [`lang:${lang}`],
          hitsPerPage: 50,
      }
  });
}