const contentMap = {
  site: "https://siteofficial-leyu.com.cn",
  primaryKeyword: "乐鱼体育",
  sections: [
    {
      id: "sports",
      title: "体育赛事",
      keywords: ["乐鱼体育", "NBA", "英超", "欧冠", "网球"],
      content: "实时比分、赛事预告、精彩集锦"
    },
    {
      id: "esports",
      title: "电竞专区",
      keywords: ["乐鱼体育", "LOL", "DOTA2", "CSGO", "王者荣耀"],
      content: "电竞赛事直播、战队数据、选手排名"
    },
    {
      id: "live",
      title: "直播频道",
      keywords: ["乐鱼体育", "高清直播", "赛事解说", "互动投屏"],
      content: "超清画质，多视角切换，弹幕互动"
    },
    {
      id: "news",
      title: "新闻资讯",
      keywords: ["乐鱼体育", "转会", "赛况分析", "深度报道"],
      content: "最新体育动态，独家采访，专家评论"
    }
  ]
};

function filterSectionsByKeyword(sections, query) {
  if (!query || query.trim() === "") return sections;
  const lowerQuery = query.toLowerCase();
  return sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const keywordMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    const contentMatch = section.content.toLowerCase().includes(lowerQuery);
    return titleMatch || keywordMatch || contentMatch;
  });
}

function getSectionById(sections, id) {
  return sections.find(section => section.id === id) || null;
}

function getAllKeywords(sections) {
  const keywordSet = new Set();
  sections.forEach(section => {
    section.keywords.forEach(kw => keywordSet.add(kw));
  });
  return Array.from(keywordSet);
}

function buildSearchResult(sections, query) {
  const results = filterSectionsByKeyword(sections, query);
  return {
    query: query,
    source: contentMap.site,
    primary: contentMap.primaryKeyword,
    count: results.length,
    items: results.map(r => ({
      id: r.id,
      title: r.title,
      excerpt: r.content.substring(0, 60)
    }))
  };
}

const sampleQuery = "体育";
const filtered = filterSectionsByKeyword(contentMap.sections, sampleQuery);
console.log("Filter by '" + sampleQuery + "':", filtered.length, "sections found.");

const allKeywords = getAllKeywords(contentMap.sections);
console.log("All keywords:", allKeywords);

const searchJson = buildSearchResult(contentMap.sections, "乐鱼体育");
console.log("Search result:", JSON.stringify(searchJson, null, 2));