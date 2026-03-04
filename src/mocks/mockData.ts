export const mockNews = {
  items: "50",
  sentiment_score_definition:
    "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish",
  relevance_score_definition:
    "0 < x <= 1, with a higher score indicating higher relevance.",
  feed: [
    {
      title:
        "JPMorgan Chase Stock Falls on Unusual Fourth Earnings. Blame Apple?",
      url: "https://www.barrons.com/articles/jpmorgan-earnings-stock-price-7aa7db98?gaa_at=eafs&gaa_n=AWEtsqdAKJI2ePSaghyM2Q5W-ica8Nc9GqzrwPqfKNPrOuMmU4sX6JF3xEQy&gaa_ts=6966faf4&gaa_sig=q9fTApDBJHeY2EitmYvOnMsVO2F-kbVYQkE5nynnmPfZd8i0Y-stH9JVO-q1trtrxIQdyPOcFcrHy5q6YXoUWg%3D%3D",
      time_published: "20260113T215701",
      authors: ["Rebecca Ungarino"],
      summary:
        "JPMorgan Chase (JPM) experienced a significant stock decline after announcing its fourth-quarter earnings, underperforming the broader market. The article suggests that Apple's role might be a factor in JPMorgan's unusual quarter. This follows a demand from President Donald Trump for a cap on credit card interest rates, adding to the financial sector's pressues.",
      banner_image:
        "https://images.barrons.com/im-24814473?width=700&height=466",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.928114",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.846947",
        },
        {
          topic: "finance",
          relevance_score: "0.848538",
        },
        {
          topic: "economy_monetary",
          relevance_score: "0.619744",
        },
      ],
      overall_sentiment_score: -0.258074,
      overall_sentiment_label: "Somewhat-Bearish",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.414155",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.722836",
          ticker_sentiment_score: "-0.123901",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Google stock (GOOG) rises after-hours on Apple’s Gemini-Siri deal as earnings near",
      url: "https://ts2.tech/en/google-stock-goog-rises-after-hours-on-apples-gemini-siri-deal-as-earnings-near/",
      time_published: "20260113T214915",
      authors: ["Khadija Saeed"],
      summary:
        "Alphabet Inc. (GOOG) Class C shares rose 1.1% in after-hours trading following news of Apple's plan to integrate Google's Gemini AI models into Siri and other AI features. This partnership is seen as a significant win for Alphabet in the generative AI space, especially as the company approaches its Q4 and full-year 2025 earnings release on February 4th. Investors are closely watching how AI advancements will impact revenue and costs, and whether this high-profile deal will boost Gemini usage and Google Cloud demand.",
      banner_image:
        "https://ts2.tech/wp-content/uploads/2026/01/google-stock-goog-rises-after-hours-on-apples-gemini-siri-deal-as-earnings-near-featured.jpg.webp",
      source: "TechStock²",
      category_within_source: "General",
      source_domain: "TechStock²",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.943601",
        },
        {
          topic: "technology",
          relevance_score: "0.816802",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.713954",
        },
      ],
      overall_sentiment_score: 0.273127,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "GOOG",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.477092",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.700668",
          ticker_sentiment_score: "0.335540",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.625137",
          ticker_sentiment_score: "0.403227",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AMZN",
          relevance_score: "0.553227",
          ticker_sentiment_score: "-0.265942",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
      ],
    },
    {
      title:
        "Intel stock rises on analyst upgrade citing data center AI demand, 'significant progress' in manufacturing",
      url: "https://finance.yahoo.com/news/intel-stock-rises-on-analyst-upgrade-citing-data-center-ai-demand-significant-progress-in-manufacturing-163050036.html",
      time_published: "20260113T214200",
      authors: ["Laura Bratton"],
      summary:
        "Intel's stock surged over 7% after KeyBanc upgraded it to Overweight, citing strong demand for its CPUs from AI data centers and significant advancements in its manufacturing business. Analyst John Vinh indicated that Intel's data center server CPUs are nearly sold out for the year and suggested a potential deal with Apple to use Intel's 18A-P process for Mac and iPad chips, along with future iPhone chips. This upgrade highlights renewed confidence in Intel's manufacturing turnaround and its potential to become a leading foundry supplier.",
      banner_image:
        "https://s.yimg.com/ny/api/res/1.2/SUccIz7MI44PLw3f75dPFQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIzMjtoPTQ4O2NmPXdlYnA-/https://s.yimg.com/os/creatr-uploaded-images/2020-12/02246f50-3412-11eb-bfdd-de89f8b3b8b8",
      source: "Yahoo Finance",
      category_within_source: "General",
      source_domain: "Yahoo Finance",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.938287",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.840307",
        },
        {
          topic: "manufacturing",
          relevance_score: "0.711830",
        },
      ],
      overall_sentiment_score: 0.323026,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "INTC",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.498735",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AMD",
          relevance_score: "0.718994",
          ticker_sentiment_score: "0.340723",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.603776",
          ticker_sentiment_score: "0.255783",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.713942",
          ticker_sentiment_score: "0.395065",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AVGO",
          relevance_score: "0.565151",
          ticker_sentiment_score: "0.128108",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Nasdaq flashes a bullish signal after treading water for more than 2 months",
      url: "https://www.marketwatch.com/story/nasdaq-flashes-a-bullish-signal-after-treading-water-for-more-than-2-months-2086d828?gaa_at=eafs&gaa_n=AWEtsqfZ4q7hZHkuKYu-D_NrWQB8vswGBgaA5XWhEVGDER8XdZavh_R9peBX&gaa_ts=69670924&gaa_sig=lJXyOpjFOrAhBHNXNq9xbiDNabciA3mfO6EoGXyAj7a-nG3EFfiCvWM8uGnO_u1O1dleBLfShQ2Bc5E29H4dEQ%3D%3D",
      time_published: "20260113T213400",
      authors: ["Joseph Adinolfi"],
      summary:
        "The Nasdaq-100 index has reportedly flashed a bullish technical pattern after struggling for over two months, suggesting potential short-term gains. This index, which includes major tech companies like Nvidia, Broadcom, and Apple, has recently shown a significant technical signal. According to one strategist, this indicates that the index could be ready to move higher.",
      banner_image: "https://images.mktw.net/im-61194496?width=1260&height=840",
      source: "MarketWatch",
      category_within_source: "General",
      source_domain: "MarketWatch",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.926300",
        },
        {
          topic: "technology",
          relevance_score: "0.711116",
        },
      ],
      overall_sentiment_score: 0.321645,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "BLSH",
          relevance_score: "0.322419",
          ticker_sentiment_score: "0.041399",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.829124",
          ticker_sentiment_score: "0.369874",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AVGO",
          relevance_score: "0.744232",
          ticker_sentiment_score: "0.394270",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.738857",
          ticker_sentiment_score: "0.384049",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "NDAQ",
          relevance_score: "0.600189",
          ticker_sentiment_score: "0.379691",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title:
        "Shutterstock celebrates 15th birthday by sharing posters of important events - iPhone, Facebook, Pokémon Go, and more",
      url: "https://betanews.com/article/shutterstock-15-birthday/",
      time_published: "20260113T212848",
      authors: ["Brian Fagioli"],
      summary:
        "Shutterstock is celebrating its 15th birthday by releasing 15 digital posters, each commemorating a significant event from one of its years in business. These events include major technological milestones like the launch of Facebook and the first iPhone, as well as global happenings such as Angela Merkel becoming Chancellor and the #MeToo movement. The company's founder and CEO, Jon Oringer, highlighted Shutterstock's growth and its future focus on enhancing its creative platform with AI technology.",
      banner_image: "https://betanews.com/wp-content/uploads/2018/07/SS15.jpg",
      source: "BetaNews",
      category_within_source: "General",
      source_domain: "BetaNews",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.841651",
        },
      ],
      overall_sentiment_score: 0.283277,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "SSTK",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.426953",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "META",
          relevance_score: "0.606496",
          ticker_sentiment_score: "0.122861",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.719896",
          ticker_sentiment_score: "0.217280",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Qualcomm (QCOM) Downgraded as Handset Drag Limits Upside, Analyst Says",
      url: "https://finviz.com/news/275357/qualcomm-qcom-downgraded-as-handset-drag-limits-upside-analyst-says",
      time_published: "20260113T210617",
      authors: ["Ghazal Ahmed"],
      summary:
        "Mizuho analyst Vijay Rakesh downgraded Qualcomm (QCOM) from Outperform to Neutral, lowering the price target from $200 to $175. The downgrade is primarily due to concerns about handset market drag limiting upside, despite Qualcomm's strong position in AI hardware and progress in non-handset businesses. Mizuho also revised down its revenue and earnings forecasts for FY26 and FY27 to below consensus expectations.",
      banner_image:
        "https://d2gr5kl7dt2z3t.cloudfront.net/blog/wp-content/uploads/2024/12/27070305/pexels-alesiakozik-6781008.jpg",
      source: "Finviz",
      category_within_source: "General",
      source_domain: "Finviz",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.919423",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.809894",
        },
        {
          topic: "technology",
          relevance_score: "0.706838",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.649610",
        },
      ],
      overall_sentiment_score: -0.049729,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "QCOM",
          relevance_score: "0.982845",
          ticker_sentiment_score: "-0.429735",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AVGO",
          relevance_score: "0.645622",
          ticker_sentiment_score: "0.138417",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MU",
          relevance_score: "0.648545",
          ticker_sentiment_score: "0.116722",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "INTC",
          relevance_score: "0.622820",
          ticker_sentiment_score: "0.128528",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.647725",
          ticker_sentiment_score: "-0.106286",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Apple just straight up robbed Google",
      url: "https://www.fastcompany.com/91474359/apple-just-straight-up-robbed-google",
      time_published: "20260113T205851",
      authors: ["Mark Wilson"],
      summary:
        "Apple is integrating Google's Gemini AI into its Siri assistant, a move the author describes as Apple \"robbing\" Google by leveraging its advanced AI technology rather than developing its own. This partnership aims to significantly upgrade Siri, which has been criticized as a disappointing product, by directly embedding Gemini's foundational architecture. The integration is expected to offer users a more personalized and capable AI experience later this year, eliminating the need for intermediary AI solutions.",
      banner_image:
        "https://images.fastcompany.com/image/upload/f_webp,c_fit,w_1920,q_auto/wp-cms-2/2026/01/p-1-91474359-apple-google-gemini.jpg",
      source: "Fast Company",
      category_within_source: "General",
      source_domain: "Fast Company",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.943485",
        },
        {
          topic: "mergers_and_acquisitions",
          relevance_score: "0.644408",
        },
      ],
      overall_sentiment_score: 0.310025,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.202937",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.928262",
          ticker_sentiment_score: "0.325531",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.910118",
          ticker_sentiment_score: "0.300549",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Horizon Kinetics compra ação da Texas Pacific Land (TPL) a US$ 311",
      url: "https://br.investing.com/news/insider-trading-news/horizon-kinetics-compra-acao-da-texas-pacific-land-tpl-a-us-311-93CH-1798924",
      time_published: "20260113T192741",
      authors: ["Investing.com"],
      summary:
        'Horizon Kinetics Asset Management LLC, uma acionista significativa da Texas Pacific Land Corp (TPL), adquiriu 1 ação ordinária por US$ 311,84 em 12 de janeiro de 2026, elevando sua participação direta para 3.487.690 ações. Esta compra segue o desdobramento de ações de três para um da TPL e anúncios recentes de resultados abaixo do esperado no terceiro trimestre de 2025, um acordo estratégico com a Bolt Data & Energy, e uma cobertura "acima da média" do KeyBanc.',
      banner_image:
        "https://i-invdn-com.investing.com/news/news_pile_69x52._800x533_L_1419494209.jpg",
      source: "Investing.com Brasil - Finanças, Câmbio e Investimentos",
      category_within_source: "General",
      source_domain: "Investing.com Brasil - Finanças, Câmbio e Investimentos",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.908508",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.840358",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.606541",
        },
      ],
      overall_sentiment_score: -0.068087,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "TPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.247480",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "HPE",
          relevance_score: "0.626472",
          ticker_sentiment_score: "-0.115452",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "IBM",
          relevance_score: "0.622938",
          ticker_sentiment_score: "-0.129561",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.633962",
          ticker_sentiment_score: "-0.146642",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.627715",
          ticker_sentiment_score: "-0.137839",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "JPMorgan’s Unusual Fourth Earnings Weigh on Stock. Blame Apple?",
      url: "https://www.barrons.com/articles/jpmorgan-earnings-stock-price-7aa7db98?gaa_at=eafs&gaa_n=AWEtsqe2XIgnl7f6Za13V-1DxUH6iVAHfC3hOwB3nRJqfmHlSNFA00FPhhKw&gaa_ts=6966bba8&gaa_sig=tOUgJSXFh3YjP4wCgM9r8ItrvKCPR6xgXQylbLLN3IYGwMWV_HJcdSH6Z3urxJ_MSi3DjbfG4URkThIamLsn-g%3D%3D",
      time_published: "20260113T192704",
      authors: ["Rebecca Ungarino"],
      summary:
        "JPMorgan Chase's fourth-quarter earnings report led to a sharp drop in its stock price, underperforming the broader market on Tuesday. The article suggests that factors beyond the bank's direct performance, such as a presidential demand to cap credit card interest rates, played a role in the market's reaction, with Apple also possibly influencing the situation.",
      banner_image:
        "https://images.barrons.com/im-24814473?width=700&height=466",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "finance",
          relevance_score: "0.813373",
        },
        {
          topic: "earnings",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.802821",
        },
      ],
      overall_sentiment_score: -0.106642,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.227753",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.746054",
          ticker_sentiment_score: "0.042749",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Jim Cramer Recently Looked At These 16 Stocks",
      url: "https://www.insidermonkey.com/blog/jim-cramer-recently-looked-at-these-16-stocks-1673619/4/",
      time_published: "20260113T182806",
      authors: ["Syeda Seirut Javed"],
      summary:
        "This article highlights some of the 16 stocks recently analyzed by Jim Cramer, focusing on Radiant Logistics, Inc. (NYSE:RLGT). Cramer recommends FedEx over Radiant Logistics for logistics plays due to its established infrastructure. The article provides details on Radiant Logistics' services and lists other stocks mentioned by Cramer.",
      banner_image:
        "https://imonkey-blog.imgix.net/blog/wp-content/uploads/2015/05/shutterstock_218812564.jpg?auto=format&expires=1799798400&w=480&h=270&fit=crop",
      source: "Insider Monkey",
      category_within_source: "General",
      source_domain: "Insider Monkey",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.920938",
        },
        {
          topic: "energy_transportation",
          relevance_score: "0.716307",
        },
        {
          topic: "finance",
          relevance_score: "0.631509",
        },
        {
          topic: "retail_wholesale",
          relevance_score: "0.642816",
        },
        {
          topic: "technology",
          relevance_score: "0.617017",
        },
      ],
      overall_sentiment_score: 0.108662,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "RLGT",
          relevance_score: "0.912080",
          ticker_sentiment_score: "0.007027",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "FDX",
          relevance_score: "0.832315",
          ticker_sentiment_score: "0.336839",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.720615",
          ticker_sentiment_score: "0.020360",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "KMB",
          relevance_score: "0.624258",
          ticker_sentiment_score: "0.008700",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "META",
          relevance_score: "0.637080",
          ticker_sentiment_score: "0.031927",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Apple Hits Adobe Where It Hurts With an Affordable Creative App Suite",
      url: "https://gizmodo.com/apple-hits-adobe-where-it-hurts-with-an-affordable-creative-app-suite-2000709741",
      time_published: "20260113T182628",
      authors: ["Kyle Barr"],
      summary:
        "Apple is introducing Creator Studio, a new subscription service offering access to its creative apps like Final Cut Pro and Logic Pro for a significantly lower price ($13/month or $3/month for students) compared to Adobe Creative Cloud. This move challenges Adobe's market dominance by providing an affordable alternative for users within Apple's ecosystem, bundling video, photo, and audio editing software along with new AI features and royalty-free content. While not a direct feature-for-feature replacement for Adobe's comprehensive suite, Apple's offering presents a much more cost-effective option for many creatives.",
      banner_image:
        "https://gizmodo.com/app/uploads/2026/01/iPad-Pro-Video-Editing-1.jpg",
      source: "Gizmodo",
      category_within_source: "General",
      source_domain: "Gizmodo",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.903405",
        },
      ],
      overall_sentiment_score: 0.039214,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "ADBE",
          relevance_score: "0.947026",
          ticker_sentiment_score: "-0.415392",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.916886",
          ticker_sentiment_score: "0.429265",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title:
        "Will Apple (AAPL) Beat Estimates Again in Its Next Earnings Report?",
      url: "https://finviz.com/news/275264/will-apple-aapl-beat-estimates-again-in-its-next-earnings-report",
      time_published: "20260113T181930",
      authors: ["Zacks Equity Research"],
      summary:
        "Apple (AAPL) is expected to beat its next earnings estimates, continuing a trend of outperforming expectations. The company has a positive Zacks Earnings ESP of +0.41% and a Zacks Rank #3 (Hold), which historically leads to a positive surprise in nearly 70% of cases. Apple's last two quarterly reports showed an average surprise of 8.75%, with the next earnings report anticipated on January 29, 2026.",
      banner_image: "https://finviz.com/gfx/nic2x2.gif",
      source: "Finviz",
      category_within_source: "General",
      source_domain: "Finviz",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.934767",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.732231",
        },
        {
          topic: "technology",
          relevance_score: "0.636533",
        },
      ],
      overall_sentiment_score: 0.499791,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.476655",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title: "Riding the AI Wave: iShares MSCI World ETF Maintains Momentum",
      url: "https://www.ad-hoc-news.de/boerse/news/ueberblick/riding-the-ai-wave-ishares-msci-world-etf-maintains-momentum/68483987",
      time_published: "20260113T175844",
      authors: [],
      summary:
        "The iShares MSCI World ETF (URTH) entered 2026 with strong momentum, outperforming its benchmark thanks to significant gains from AI-related tech giants. The ETF's performance is driven by a heavy allocation to US technology stocks, focusing exclusively on developed markets. While this strategy offers opportunities, it also presents concentration risks and higher volatility during tech-sector downturns, despite showing slightly softer returns compared to more diversified global peers in 2025.",
      banner_image:
        "https://boerse-global.de/img_artikel_boerse_global/2026/01/13/20260113175103.jpg",
      source: "AD HOC NEWS",
      category_within_source: "General",
      source_domain: "AD HOC NEWS",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.908807",
        },
        {
          topic: "technology",
          relevance_score: "0.832632",
        },
        {
          topic: "finance",
          relevance_score: "0.718572",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.635832",
        },
      ],
      overall_sentiment_score: 0.342983,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "URTH",
          relevance_score: "0.975116",
          ticker_sentiment_score: "0.332655",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.738882",
          ticker_sentiment_score: "0.406715",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.692639",
          ticker_sentiment_score: "0.308835",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.638024",
          ticker_sentiment_score: "0.309924",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.583861",
          ticker_sentiment_score: "0.341121",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Here’s What to Expect From Intercontinental Exchange's Next Earnings Report",
      url: "https://www.barchart.com/story/news/37024024/heres-what-to-expect-from-intercontinental-exchange-s-next-earnings-report",
      time_published: "20260113T175603",
      authors: ["Subhasree Kar"],
      summary:
        'Intercontinental Exchange (ICE) is set to release its Q4 2025 earnings report, with analysts projecting an EPS of $1.68, a 10.5% increase year-over-year. The company has a strong track record of beating earnings estimates and is expected to see continued EPS growth in fiscal years 2025 and 2026. Despite a slight revenue miss in Q3 2025, analysts maintain a "Strong Buy" rating for ICE, anticipating a 15.2% upside potential from its current stock price.',
      banner_image:
        "https://media.barchart.com/contributors-admin/common-images/images/S%26P%20500%20Companies/Financial%20(names%20A%20-%20I)/Intercontinental%20Exchange%20Inc%20logos-by%20viewimage%20via%20Shutteretock.jpg",
      source: "Barchart.com",
      category_within_source: "General",
      source_domain: "Barchart.com",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.928008",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.822787",
        },
        {
          topic: "finance",
          relevance_score: "0.723899",
        },
      ],
      overall_sentiment_score: 0.203724,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "ICE",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.572765",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "NFLX",
          relevance_score: "0.569895",
          ticker_sentiment_score: "-0.210565",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.553749",
          ticker_sentiment_score: "0.088334",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "What Happens When Apple Turns to Google for AI Technology? We’re About to Find Out",
      url: "https://www.inc.com/ben-sherry/apple-turns-to-google-for-ai-technology-siri-upgrade/91287433",
      time_published: "20260113T173055",
      authors: ["BEN SHERRY"],
      summary:
        "Apple has announced a partnership with Google to power the next generation of its AI models, specifically for the Apple Intelligence suite and a revamped Siri. The new AI models, based on Google's Gemini, will run on Apple devices and servers and are expected to significantly upgrade Siri's conversational abilities and functions, including answering factual questions, providing emotional support, and generating documents. This collaboration follows Apple's extensive search for an AI partner after its own AI capabilities were deemed a disappointment.",
      banner_image:
        "https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/vip/2026/01/apple-google-ai-gemini-siri-inc-2248380865.jpg",
      source: "Inc.com",
      category_within_source: "General",
      source_domain: "Inc.com",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.937233",
        },
      ],
      overall_sentiment_score: 0.243516,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.209312",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.846011",
          ticker_sentiment_score: "0.232216",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.810142",
          ticker_sentiment_score: "0.202041",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Qualcomm Inc (NASDAQ:QCOM) Downgraded To Neutral",
      url: "https://fxdailyreport.com/qualcomm-inc-nasdaqqcom-downgraded-to-neutral/",
      time_published: "20260113T172745",
      authors: ["Swapna Meka"],
      summary:
        "Mizuho downgraded Qualcomm Inc (NASDAQ:QCOM) to Neutral from Outperform, lowering its price target to $175 from $200 due to increasing risks related to Apple. The downgrade is attributed to anticipated headwinds in Qualcomm's handset shipments and iPhone content in 2026, as well as softer global handset demand and Apple's push for in-house component design. Despite this, Qualcomm is expanding into robotics, introducing a full-stack architecture for service robots and humanoids, and developing the Dragonwing industrial processor roadmap.",
      banner_image: null,
      source: "FXDailyReport.Com",
      category_within_source: "General",
      source_domain: "FXDailyReport.Com",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.931289",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.709398",
        },
      ],
      overall_sentiment_score: -0.142044,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "QCOM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.389250",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.704271",
          ticker_sentiment_score: "-0.277035",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AMD",
          relevance_score: "0.569942",
          ticker_sentiment_score: "0.226347",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Apple Partners With Google's Gemini to Power AI Version of Siri",
      url: "https://www.tradingview.com/news/gurufocus:1688bc9d1094b:0-apple-partners-with-google-s-gemini-to-power-ai-version-of-siri/",
      time_published: "20260113T172630",
      authors: [],
      summary:
        "Apple Inc. is reportedly partnering with Google, integrating Google's Gemini AI models to power a new AI-driven version of Siri. This multiyear deal is a significant move for Apple into the competitive AI space, with reports suggesting Apple could pay Google around $1 billion annually for the technology. The updated Siri, leveraging both Gemini and Apple's own Foundation Models, is expected to launch later this year.",
      banner_image: null,
      source: "TradingView — Track All Markets",
      category_within_source: "General",
      source_domain: "TradingView — Track All Markets",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.906757",
        },
        {
          topic: "mergers_and_acquisitions",
          relevance_score: "0.634537",
        },
      ],
      overall_sentiment_score: 0.214493,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.221097",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.827997",
          ticker_sentiment_score: "0.304489",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.827196",
          ticker_sentiment_score: "0.349830",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.609100",
          ticker_sentiment_score: "-0.147314",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Should You Buy, Hold or Sell Goldman Stock Ahead of Its Q4 Earnings?",
      url: "https://www.theglobeandmail.com/investing/markets/stocks/GS/pressreleases/37023200/should-you-buy-hold-or-sell-goldman-stock-ahead-of-its-q4-earnings/",
      time_published: "20260113T171057",
      authors: ["Zacks Investment Research"],
      summary:
        "Goldman Sachs (GS) is set to release its Q4 2025 earnings, with Zacks analysts expecting a revenue increase but a slight decline in EPS. Key factors influencing performance include solid market-making revenues, strong investment banking fees driven by M&A and IPO activity, and robust net interest income, despite anticipated rises in general expenses and one-time charges from the Apple Card partnership termination. While the company's long-term prospects are strong due to strategic pivots and AI integration, a somewhat expensive valuation and rising costs suggest investors might consider waiting until after earnings for a more appealing entry point.",
      banner_image:
        "https://staticx-tuner.zacks.com/images/articles/main/98/601.jpg",
      source: "The Globe and Mail",
      category_within_source: "General",
      source_domain: "The Globe and Mail",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.924411",
        },
        {
          topic: "finance",
          relevance_score: "0.809714",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.748000",
        },
        {
          topic: "mergers_and_acquisitions",
          relevance_score: "0.643011",
        },
      ],
      overall_sentiment_score: 0.133578,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "GS",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.255052",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "JPM",
          relevance_score: "0.647925",
          ticker_sentiment_score: "0.126598",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.605471",
          ticker_sentiment_score: "0.091461",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MS",
          relevance_score: "0.613449",
          ticker_sentiment_score: "0.122364",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Apple Revives Validity Challenge to Wireless-Transmission Patent",
      url: "https://news.bloomberglaw.com/business-and-practice/apple-revives-validity-challenge-to-wireless-transmission-patent",
      time_published: "20260113T170226",
      authors: ["Michael Shapiro"],
      summary:
        "The Federal Circuit has revived Apple Inc.'s challenge against a wireless data-transmission patent held by Smart Mobile Technologies LLC. The appeals court ruled that the Patent Trial and Appeal Board (PTAB) was wrong to reject an argument raised by Apple concerning the interpretation of claim limitations involving antennae. This decision is part of ongoing litigation where Smart Mobile Technologies has asserted infringement of over a dozen patents against Apple.",
      banner_image:
        "https://news-api.bloomberglaw.com/v1/resize-image?url=http%3A%2F%2Fbloomberg-bna-brightspot.s3.amazonaws.com%2Fe0%2Fc9%2Fd680c9184704a499de8617363d45%2F343555139.jpg&width=1240&height=480&fit=cover&crop=4000x1542%2B0%2B662",
      source: "Bloomberg Law News",
      category_within_source: "General",
      source_domain: "Bloomberg Law News",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.916801",
        },
      ],
      overall_sentiment_score: -0.221845,
      overall_sentiment_label: "Somewhat-Bearish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.229645",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
      ],
    },
    {
      title: "Jim Cramer Predicted Apple (AAPL)’s Gemini Deal",
      url: "https://www.insidermonkey.com/blog/jim-cramer-predicted-apple-aapls-gemini-deal-1674136/",
      time_published: "20260113T165625",
      authors: ["Ramish Cheema"],
      summary:
        "Jim Cramer predicted that Apple (AAPL) would integrate Google's Gemini AI into its platform, serving as the sole AI source for the company in 2026. This prediction comes amidst Bernstein reiterating a Buy rating on Apple with a $325 target, despite other analysts raising concerns about Apple's future gains. Cramer continues to advocate for holding Apple stock, dismissing detractors' concerns about weak iPhone performance and lack of AI initiatives.",
      banner_image:
        "https://imonkey-blog.imgix.net/blog/wp-content/uploads/2021/05/08130933/brandon-romanchuk-NOFyRmSQfUQ-unsplash-750x500.jpg?auto=format&fit=clip&expires=1799798400&width=480&height=320",
      source: "Insider Monkey",
      category_within_source: "General",
      source_domain: "Insider Monkey",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.843099",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.718226",
        },
      ],
      overall_sentiment_score: 0.3385,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.342446",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Earnings call transcript: JPMorgan beats Q4 2025 earnings expectations",
      url: "https://www.investing.com/news/transcripts/earnings-call-transcript-jpmorgan-beats-q4-2025-earnings-expectations-93CH-4445216",
      time_published: "20260113T162706",
      authors: ["Investing.com"],
      summary:
        "JPMorgan Chase reported strong fourth-quarter and full-year 2025 financial results, with EPS of $5.23 and revenue of $46.77 billion, exceeding analyst expectations. Despite the beat, the stock showed a modest pre-market increase, reflecting cautious investor sentiment amid broader market conditions and potential regulatory shifts. The earnings call discussed the acquisition of the Apple Card portfolio, the outlook for 2026 including NII projections and expense growth driven by strategic investments, and addressed concerns about potential credit card APR caps and capital requirements.",
      banner_image:
        "https://i-invdn-com.investing.com/news/world_news_2_69x52._800x533_L_1419494365.jpg",
      source: "Investing.com",
      category_within_source: "General",
      source_domain: "Investing.com",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.944975",
        },
        {
          topic: "finance",
          relevance_score: "0.829674",
        },
        {
          topic: "economy_monetary",
          relevance_score: "0.625930",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.631788",
        },
        {
          topic: "blockchain",
          relevance_score: "0.615881",
        },
      ],
      overall_sentiment_score: 0.276255,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.408095",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "COIN",
          relevance_score: "0.625880",
          ticker_sentiment_score: "0.206143",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.728733",
          ticker_sentiment_score: "0.242515",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Apple Releases Its Answer to Adobe Creative Cloud With New Creator Studio Subscription Bundle",
      url: "https://nofilmschool.com/apple-creator-studio",
      time_published: "20260113T162636",
      authors: ["Jourdan Aldredge"],
      summary:
        "Apple has introduced Creator Studio, a new subscription bundle designed to compete with Adobe Creative Cloud. This service integrates creative apps like Final Cut Pro, Logic Pro, and Pixelmator Pro, offering advanced intelligent features and premium content for video editing, music creation, and visual productivity across Mac, iPad, and iPhone. Available monthly or yearly, with special pricing for students and educators, it provides a comprehensive suite for various creators.",
      banner_image:
        "https://nofilmschool.com/media-library/apple-creator-studio.jpg?id=62722529&width=1245&height=700&quality=50&coordinates=0%2C0%2C0%2C0",
      source: "No Film School",
      category_within_source: "General",
      source_domain: "No Film School",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.930893",
        },
      ],
      overall_sentiment_score: 0.143844,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "ADBE",
          relevance_score: "0.957471",
          ticker_sentiment_score: "-0.249426",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.455375",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title:
        "Apple Jumps on the Subscription Software Bandwagon. Why Adobe Stock Is Dropping.",
      url: "https://www.barrons.com/articles/apple-stock-price-new-software-adobe-71424855?gaa_at=eafs&gaa_n=AWEtsqckAw1qxftDuAc5DvzAF10m6uvYjbjK0iCJxInKG67ikwTJBqlCyuLt&gaa_ts=69668344&gaa_sig=TkyQJF-lNsHiTDpWNGuiMD64nHrqPbTPGjy64NrWEzXF0rcATrrZbbSS57k_SkwCrW3k_U7O1I1suxdqzHEolA%3D%3D",
      time_published: "20260113T162627",
      authors: ["Angela Palumbo"],
      summary:
        "Apple announced a new subscription plan for its creative software applications, which is seen as a competitive move against Adobe. The new Creator Studio subscription will cost $12.99 per month or $129 annually. This development adds pressure on Adobe's stock.",
      banner_image:
        "https://images.barrons.com/im-79389866?width=700&height=466",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.802206",
        },
      ],
      overall_sentiment_score: -0.125546,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "ADBE",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.426295",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.900165",
          ticker_sentiment_score: "0.206422",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Apple launches Creator Studio in new subscription package for digital creators",
      url: "https://seekingalpha.com/news/4538847-apple-launches-creator-studio-in-new-subscription-package-for-digital-creators",
      time_published: "20260113T160403",
      authors: ["Brandon Evans"],
      summary:
        "Apple is introducing \"Creator Studio,\" a new subscription package aimed at digital creators, musicians, writers, students, educators, and social media influencers. This suite will bundle several of Apple's professional and productivity applications, including Final Cut Pro, Logic Pro, Pixelmator Pro, Keynote, Pages, and Numbers, under a single subscription. The initiative is designed to attract a wider audience of creative professionals and content creators to Apple's ecosystem.",
      banner_image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1437209104/image_1437209104.jpg?io=getty-c-w630",
      source: "Seeking Alpha",
      category_within_source: "General",
      source_domain: "Seeking Alpha",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.908989",
        },
      ],
      overall_sentiment_score: 0.420291,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "0.950910",
          ticker_sentiment_score: "0.418958",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title:
        "Should Retirees Look At John Hancock’s Large Cap ETF, Or Move Along? | JHML",
      url: "https://247wallst.com/investing/2026/01/13/should-retirees-look-at-john-hancocks-large-cap-etf-or-move-along-jhml/",
      time_published: "20260113T155656",
      authors: ["Michael Williams"],
      summary:
        "The article evaluates John Hancock Multifactor Large Cap ETF (JHML) for retirees, concluding that its high technology allocation, modest dividend yield, and recent underperformance compared to the S&P 500 make it unsuitable for income-focused retirement strategies. While JHML has tax efficiency with low turnover, retirees needing cash flow might still face capital gains by selling shares to generate income. The article suggests alternatives like the WisdomTree U.S. Quality Dividend Growth Fund (DGRW) for those seeking both factor exposure and meaningful, growing income.",
      banner_image:
        "https://247wallst.com/wp-content/uploads/2019/01/gettyimages-884678024.jpg",
      source: "24/7 Wall St.",
      category_within_source: "General",
      source_domain: "24/7 Wall St.",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.933491",
        },
        {
          topic: "finance",
          relevance_score: "0.829578",
        },
      ],
      overall_sentiment_score: 0.055413,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "JHML",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.226385",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.625788",
          ticker_sentiment_score: "0.105883",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.617946",
          ticker_sentiment_score: "0.147752",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.608838",
          ticker_sentiment_score: "0.133765",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Apple Is Jumping on the Subscription Software Bandwagon. Look Out Adobe.",
      url: "https://www.barrons.com/articles/apple-stock-price-creator-studio-71424855?gaa_at=eafs&gaa_n=AWEtsqfLWd55oI-nhW3zurjC5u_9LC7vOf7-R-MVBEkeo45OuAOZHmHuAhK_&gaa_ts=69666e2f&gaa_sig=R8KytyPvP86uw18JWIVgfZgFT789mVuY1Ci8qWmYWXqicqUMq5nDNfnYrGMPHWTXC_iF_LCiBWaf0yQpErD-3g%3D%3D",
      time_published: "20260113T154520",
      authors: ["Angela Palumbo"],
      summary:
        "Apple announced a new subscription plan for its creative software apps, called Creator Studio, priced at $12.99 a month or $129 a year. This move is seen as bringing increased competitive pressure to Adobe. The article suggests this launch is impacting Adobe's stock.",
      banner_image:
        "https://images.barrons.com/im-79389866?width=700&height=466",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.929568",
        },
        {
          topic: "retail_wholesale",
          relevance_score: "0.612679",
        },
        {
          topic: "finance",
          relevance_score: "0.634790",
        },
      ],
      overall_sentiment_score: -0.04873,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "ADBE",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.397993",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.902582",
          ticker_sentiment_score: "0.322365",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Google Now Tops in AI as Alphabet Stock Keeps Rising Past $4 Trillion Milestone",
      url: "https://www.barrons.com/articles/google-stock-price-alphabet-4-trillion-74a8ba6b?gaa_at=eafs&gaa_n=AWEtsqci9PZLTkPc_zqioLqpuiaG1ncR-6k6LtjoKnjxuYLRvJ--1jsr5_1p&gaa_ts=6966835d&gaa_sig=_f4zDLHFzwFV17zL_90czF8oLwSDREpeMDahhByl488ujFmXRNM_QEjOWzkYdely8f1u_qIVkOHCUG9PBOzAuQ%3D%3D",
      time_published: "20260113T152656",
      authors: ["George Glover"],
      summary:
        "Alphabet's stock continues its record-breaking ascent, officially joining the $4 trillion club and solidifying Google's position as a leading company in artificial intelligence. The new AI darling status for Google's parent company is further bolstered by the announcement that its Gemini AI will power Apple's AI features.",
      banner_image:
        "https://images.barrons.com/im-95440341?width=700&height=467",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.920864",
        },
        {
          topic: "earnings",
          relevance_score: "0.704523",
        },
      ],
      overall_sentiment_score: 0.747388,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "GOOGL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.862691",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.729418",
          ticker_sentiment_score: "0.425978",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.937990",
          ticker_sentiment_score: "0.892240",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title:
        "Microsoft launches data center initiative to limit power costs, water use",
      url: "https://www.marketscreener.com/news/microsoft-launches-data-center-initiative-to-limit-power-costs-water-use-ce7e58dbde80f021",
      time_published: "20260113T152643",
      authors: [],
      summary:
        "Microsoft has launched a new initiative to address concerns about its data centers' power consumption and water usage in the U.S. The company has pledged to pay utility rates that cover power costs, work with local utilities to expand supply, replenish more water than consumed, and publish water-use information for each data center region. This move comes as political leaders push for AI data center expansion, while local communities express worries about increased utility bills and resource depletion.",
      banner_image:
        "https://cdn.zonebourse.com/static/resize/768/432//images/reuters/2025-12/2025-12-11T140519Z_1_LYNXMPELBA0VI_RTROPTP_4_MICROSOFT-CLOUD-BRITAIN-LAWSUIT.JPG",
      source: "marketscreener.com",
      category_within_source: "General",
      source_domain: "marketscreener.com",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.908301",
        },
        {
          topic: "economy_fiscal",
          relevance_score: "0.601041",
        },
        {
          topic: "energy_transportation",
          relevance_score: "0.645588",
        },
      ],
      overall_sentiment_score: 0.145857,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "MSFT",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.344324",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "CDNS",
          relevance_score: "0.603188",
          ticker_sentiment_score: "0.114188",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.642902",
          ticker_sentiment_score: "0.101203",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.606560",
          ticker_sentiment_score: "0.114289",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "CRM",
          relevance_score: "0.634000",
          ticker_sentiment_score: "0.110454",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Apple stock today: Creator Studio debut and Gemini Siri deal keep AAPL in play ahead of earnings",
      url: "https://ts2.tech/en/apple-stock-today-creator-studio-debut-and-gemini-siri-deal-keep-aapl-in-play-ahead-of-earnings/",
      time_published: "20260113T152630",
      authors: ["Shan Ahmed Khan"],
      summary:
        "Apple shares saw minimal movement following the launch of its new Creator Studio subscription bundle, as investors weigh the company's shift towards services and a significant AI deal with Google. The market is now focused on Apple's upcoming January 29 earnings report for insights into iPhone sales and the rollout progress of its AI initiatives. This service-focused strategy, including the Creator Studio and an enhanced Siri powered by Google's Gemini, aims to sustain revenue growth amidst varying hardware demand and increasing regulatory scrutiny.",
      banner_image:
        "https://ts2.tech/wp-content/uploads/2026/01/apple-stock-today-creator-studio-debut-and-gemini-siri-deal-keep-aapl-in-play-ahead-of-earnings-featured.jpg.webp",
      source: "TechStock²",
      category_within_source: "General",
      source_domain: "TechStock²",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.928653",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.837999",
        },
        {
          topic: "technology",
          relevance_score: "0.817584",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.628352",
        },
      ],
      overall_sentiment_score: 0.126528,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.026721",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.726501",
          ticker_sentiment_score: "0.303719",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.734959",
          ticker_sentiment_score: "0.304067",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "TSLA",
          relevance_score: "0.625768",
          ticker_sentiment_score: "-0.124534",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Google passes historic $4 trillion threshold",
      url: "https://mashable.com/article/google-alphabet-4-trillion-market-valuation-apple-gemini",
      time_published: "20260113T152628",
      authors: ["Alex Perry"],
      summary:
        "Google's parent company, Alphabet, has achieved a $4 trillion stock market valuation, becoming only the fourth company to reach this milestone, following Nvidia, Apple, and Microsoft. This achievement closely followed Apple's announcement that Google Gemini would power the AI version of Siri. While Alphabet's shares rose by about 1 percent after the news, analysts suggest this was more of a cumulative effect given Google's continued dominance in search and growth in AI and hardware.",
      banner_image:
        "https://helios-i.mashable.com/imagery/articles/03Bhz2rp0fEDU1fygtLUK2P/hero-image.fill.size_1248x702.v1768252732.jpg",
      source: "Mashable",
      category_within_source: "General",
      source_domain: "Mashable",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.901972",
        },
        {
          topic: "earnings",
          relevance_score: "0.707962",
        },
      ],
      overall_sentiment_score: 0.322224,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "GOOGL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.492710",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.939910",
          ticker_sentiment_score: "0.450833",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.727150",
          ticker_sentiment_score: "0.304246",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.623335",
          ticker_sentiment_score: "0.208370",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.645115",
          ticker_sentiment_score: "0.235052",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Apple Confirms Partnership With Google Gemini for Siri",
      url: "https://news.macgasm.net/apple-inc-news/apple-google-gemini-partnership/",
      time_published: "20260113T152627",
      authors: ["Jeff Cochin"],
      summary:
        "Apple has officially confirmed a multi-year partnership with Google, where Google's Gemini models will power the next generation of Siri and Apple Intelligence. This decision comes after Apple's internal evaluations, indicating Gemini offered the most capable foundation for large-scale AI features. Despite past privacy concerns with Google, Apple asserts it will maintain control over user experience, privacy, and system integration, with Gemini running on Apple's infrastructure.",
      banner_image:
        "https://news.macgasm.net/wp-content/uploads/2026/01/apple-confirms-google-gemini-partnership-696x261.jpg",
      source: "Macgasm",
      category_within_source: "General",
      source_domain: "Macgasm",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
      ],
      overall_sentiment_score: 0.280753,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.325961",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.824045",
          ticker_sentiment_score: "0.223563",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.720633",
          ticker_sentiment_score: "0.221966",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "JPMorgan Chase Reports 9% Rise in Adjusted Fourth-Quarter Profits",
      url: "https://mlq.ai/news/jpmorgan-chase-reports-9-rise-in-adjusted-fourth-quarter-profits/",
      time_published: "20260113T152546",
      authors: ["Earnings Desk"],
      summary:
        "JPMorgan Chase reported a 9% rise in adjusted fourth-quarter profits, with net income reaching $13.0 billion or $4.63 per share. Excluding a $2.2 billion charge for Apple Card loan-loss reserves, adjusted net income was $14.7 billion, or $5.23 per share, exceeding analyst expectations. CEO Jamie Dimon cited strong consumer spending and healthy businesses as key factors contributing to the positive results.",
      banner_image:
        "https://mlqpdf.s3.amazonaws.com/news_images/jp-morgan-eanrings.png",
      source: "MLQ.ai",
      category_within_source: "General",
      source_domain: "MLQ.ai",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.914944",
        },
        {
          topic: "finance",
          relevance_score: "0.806617",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.626948",
        },
      ],
      overall_sentiment_score: 0.040911,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.313717",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GS",
          relevance_score: "0.814717",
          ticker_sentiment_score: "-0.147759",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.705722",
          ticker_sentiment_score: "-0.136768",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Apple Bundles Creative Apps Into New $13-a-Month Subscription",
      url: "https://www.bloomberg.com/news/articles/2026-01-13/apple-bundles-creative-apps-into-new-13-a-month-subscription",
      time_published: "20260113T143310",
      authors: ["Chris Welch"],
      summary:
        "Apple Inc. has launched a new subscription service called Creator Studio, bundling its creative applications like Final Cut Pro, Logic Pro, and Pixelmator Pro for $12.99 per month or $129 annually. This initiative aims to rejuvenate its photo and video editing software offerings amid increasing competition. Students and educators can access the bundle at a discounted rate.",
      banner_image:
        "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iz9ZuD7r.tN0/v1/-1x-1.webp",
      source: "Bloomberg.com",
      category_within_source: "General",
      source_domain: "Bloomberg.com",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.942768",
        },
      ],
      overall_sentiment_score: 0.105793,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.345210",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "ADBE",
          relevance_score: "0.587991",
          ticker_sentiment_score: "-0.131275",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Why Apple Chose Google to Power the Future of AI",
      url: "https://finviz.com/news/275309/why-apple-chose-google-to-power-the-future-of-ai",
      time_published: "20260113T143200",
      authors: ["Jeffrey Neal Johnson"],
      summary:
        "Apple and Alphabet have formed a strategic partnership to integrate Google's Gemini AI models into Apple's ecosystem, marking a significant shift in the tech landscape. This deal allows Apple to leverage Google's advanced AI capabilities while maintaining its privacy protocols through a hybrid model. The agreement is a win-win, providing Apple with capital efficiency and a sales catalyst for future iPhones, and solidifying Google's position as the industry-standard AI infrastructure provider with access to billions of Apple devices.",
      banner_image:
        "https://www.marketbeat.com/logos/articles/med_20260113095334_why-apple-chose-google-to-power-the-future-of-ai.png",
      source: "Finviz",
      category_within_source: "General",
      source_domain: "Finviz",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.941518",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.820138",
        },
        {
          topic: "earnings",
          relevance_score: "0.715315",
        },
      ],
      overall_sentiment_score: 0.424637,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.405824",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.981476",
          ticker_sentiment_score: "0.474316",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.869466",
          ticker_sentiment_score: "0.446149",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title: "The Biggest Loser: Tim Cook of Apple",
      url: "https://247wallst.com/investing/2026/01/13/the-biggest-loser-tim-cook-of-apple/",
      time_published: "20260113T141803",
      authors: ["Douglas A. McIntyre"],
      summary:
        "The article argues that Apple CEO Tim Cook has fallen behind in the artificial intelligence race, failing to launch a proprietary state-of-the-art AI product. Instead, Apple has partnered with Alphabet to use Gemini AI software, despite Cook's prior assurances of Apple's leadership in AI. This move places Apple at a disadvantage compared to other tech giants who have developed their own advanced AI technologies.",
      banner_image:
        "https://247wallst.com/wp-content/uploads/2022/03/imageForEntry20-Kis.jpg",
      source: "24/7 Wall St.",
      category_within_source: "General",
      source_domain: "24/7 Wall St.",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.810059",
        },
        {
          topic: "finance",
          relevance_score: "0.722395",
        },
      ],
      overall_sentiment_score: 0.092964,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "0.977294",
          ticker_sentiment_score: "-0.448197",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.729270",
          ticker_sentiment_score: "0.249260",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "META",
          relevance_score: "0.617025",
          ticker_sentiment_score: "0.110705",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.557973",
          ticker_sentiment_score: "0.295892",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.574303",
          ticker_sentiment_score: "0.149200",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Pro video and music tools in one $13 Apple Creator Studio bundle",
      url: "https://www.stocktitan.net/news/AAPL/apple-introduces-apple-creator-studio-an-inspiring-collection-of-the-xhsa3j402ut4.html",
      time_published: "20260113T140303",
      authors: [],
      summary:
        "Apple has launched its new Apple Creator Studio, a subscription bundle offering professional-grade creative applications like Final Cut Pro, Logic Pro, and Pixelmator Pro, enhanced with AI features. Available for $12.99 per month or $129 per year, the suite aims to empower creators across various disciplines, from video editing and music production to graphic design and visual productivity, on Mac, iPad, and iPhone. The bundle also includes new intelligent tools for Keynote, Pages, and Numbers, along with premium content and a one-month free trial.",
      banner_image: null,
      source: "Stock Titan",
      category_within_source: "General",
      source_domain: "Stock Titan",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
      ],
      overall_sentiment_score: 0.473415,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.478162",
          ticker_sentiment_label: "Bullish",
        },
      ],
    },
    {
      title: "APPLE INC : JP Morgan gives a Buy rating",
      url: "https://www.marketscreener.com/news/apple-inc-jp-morgan-gives-a-buy-rating-ce7e58dbde88f420",
      time_published: "20260113T140003",
      authors: ["MarketScreener with dpa-AFX Analyser"],
      summary:
        "JP Morgan analyst Samik Chatterjee has reiterated a Buy rating on Apple Inc. with an unchanged target price of USD 305. The recommendation was published on January 13, 2026, at 08:56 am EST. Apple's stock (AAPL) was trading at 260.25 USD, up 0.34%, in pre-market trading around 09:27 am EST on the same day.",
      banner_image: null,
      source: "marketscreener.com",
      category_within_source: "General",
      source_domain: "marketscreener.com",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.904853",
        },
        {
          topic: "technology",
          relevance_score: "0.832184",
        },
        {
          topic: "earnings",
          relevance_score: "0.742801",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.632991",
        },
      ],
      overall_sentiment_score: 0.315099,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.510747",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "JPM",
          relevance_score: "0.629984",
          ticker_sentiment_score: "0.116331",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "KeyBanc maintains Sector Weight rating on Apple stock amid mixed spending data",
      url: "https://www.investing.com/news/analyst-ratings/keybanc-maintains-sector-weight-rating-on-apple-stock-amid-mixed-spending-data-93CH-4444724",
      time_published: "20260113T135203",
      authors: ["Investing.com"],
      summary:
        "KeyBanc Capital Markets has maintained its Sector Weight rating on Apple stock, citing mixed consumer spending data. While Apple's spending index showed a month-over-month increase below the three-year average, quarterly spending significantly outpaced the average. The firm's neutral stance is influenced by factors like increasing iPhone 17 activity and challenging comparisons, despite Apple's strong financial health and recent notable developments such as a surge in iPhone sales in China and an AI agreement with Google.",
      banner_image:
        "https://i-invdn-com.investing.com/news/apple_800x533_L_1411373495.jpg",
      source: "Investing.com",
      category_within_source: "General",
      source_domain: "Investing.com",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.919714",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.839875",
        },
        {
          topic: "technology",
          relevance_score: "0.731429",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.604333",
        },
      ],
      overall_sentiment_score: 0.140726,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.023664",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.603806",
          ticker_sentiment_score: "0.225825",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Registros de patentes da Apple caíram nos EUA em 2025",
      url: "https://macmagazine.com.br/post/2026/01/13/registros-de-patentes-da-apple-cairam-nos-eua-em-2025/",
      time_published: "20260113T132630",
      authors: ["Douglas Nascimento"],
      summary:
        "A Apple registrou uma queda significativa nos registros de patentes nos EUA em 2025, caindo da quarta para a sexta posição e registrando 2.722 patentes, frente a 3.082 em 2024. Essa redução de 11,68% a coloca ao lado da LG como as únicas empresas do Top 10 com menos patentes concedidas. A queda da Apple alinha-se a uma tendência geral de empresas americanas, que viram uma redução de 9% nas patentes concedidas em 2025, potencialmente impulsionada pela preferência de manter segredos comerciais no cenário da inteligência artificial.",
      banner_image:
        "https://macmagazine.com.br/wp-content/uploads/2024/06/7-apple-logo-800x533.jpg",
      source: "MacMagazine",
      category_within_source: "General",
      source_domain: "MacMagazine",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
      ],
      overall_sentiment_score: 0.043675,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.349080",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "DELL",
          relevance_score: "0.742432",
          ticker_sentiment_score: "0.333272",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Qualcomm: 3 Scenarios, One Mispriced Stock (NASDAQ:QCOM)",
      url: "https://seekingalpha.com/article/4859140-qualcomm-3-scenarios-one-mispriced-stock",
      time_published: "20260113T131749",
      authors: ["Agar Capital"],
      summary:
        "Qualcomm (QCOM) presents an attractive investment opportunity despite market skepticism, trading at 15x earnings with a 6.7% FCF yield and 2.0% dividend yield. The company's strength lies in edge/on-device AI, energy efficiency, and connectivity, not direct competition with Nvidia's data center dominance. While market concerns like Apple's integration and customer concentration are largely priced in, QCOM's unique position as a chip designer/platform company offers embedded growth potential across various sectors.",
      banner_image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1642572895/image_1642572895.jpg?io=getty-c-w630",
      source: "Seeking Alpha",
      category_within_source: "General",
      source_domain: "Seeking Alpha",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.801296",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.703298",
        },
        {
          topic: "earnings",
          relevance_score: "0.730625",
        },
      ],
      overall_sentiment_score: 0.274935,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "QCOM",
          relevance_score: "0.962312",
          ticker_sentiment_score: "0.600556",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.746694",
          ticker_sentiment_score: "0.341623",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.693088",
          ticker_sentiment_score: "-0.190330",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
      ],
    },
    {
      title:
        "Should iShares Russell Top 200 Growth ETF (IWY) Be on Your Investing Radar?",
      url: "https://www.sharewise.com/us/news_articles/Should_iShares_Russell_Top_200_Growth_ETF_IWY_Be_on_Your_Investing_Radar_Zacks_20260113_1220",
      time_published: "20260113T125831",
      authors: ["Zacks"],
      summary:
        "The iShares Russell Top 200 Growth ETF (IWY) is a passively managed ETF focusing on large-cap growth companies in the US equity market, with over $16.29 billion in assets. It has an expense ratio of 0.2% and is heavily allocated to the Information Technology sector, with top holdings including Nvidia, Apple, and Microsoft. The ETF holds a Zacks ETF Rank of 1 (Strong Buy) and has shown a 20.06% return over the last year, making it a strong option for investors seeking exposure to large-cap growth.",
      banner_image:
        "https://www.sharewise.com/assets/news/news5-ffb7c23901381e6052a84056ce72e4ea917ae76c2815a2e312872f5611e5f260.png",
      source: "www.sharewise.com",
      category_within_source: "General",
      source_domain: "www.sharewise.com",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.939253",
        },
        {
          topic: "technology",
          relevance_score: "0.844919",
        },
      ],
      overall_sentiment_score: 0.304323,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "IWY",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.326574",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.715707",
          ticker_sentiment_score: "0.332293",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.601541",
          ticker_sentiment_score: "0.315825",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.615513",
          ticker_sentiment_score: "0.322638",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title: "Apple: Trapped Between Google & A Hard AI Phase (NASDAQ:AAPL)",
      url: "https://seekingalpha.com/article/4859128-apple-trapped-between-google-and-a-hard-ai-phase",
      time_published: "20260113T124601",
      authors: ["Uttam Dey"],
      summary:
        "Apple has been downgraded to Hold/Neutral due to strategic AI execution lags, mounting cost pressures, and a bleak outlook for iPhone sales. The integration of Siri with Google Gemini signals weakness in Apple's in-house AI capabilities and could lead to significant payouts to Google, impacting gross margins and earnings multiples. The author suggests a plausible 10% downside to Apple's stock, bringing it to $235, as its forward PE faces mean reversion risk.",
      banner_image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/2167757990/image_2167757990.jpg?io=getty-c-w630",
      source: "Seeking Alpha",
      category_within_source: "General",
      source_domain: "Seeking Alpha",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.937455",
        },
        {
          topic: "earnings",
          relevance_score: "0.823447",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.726293",
        },
      ],
      overall_sentiment_score: -0.179004,
      overall_sentiment_label: "Somewhat-Bearish",
      ticker_sentiment: [
        {
          ticker: "AAPL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "-0.445011",
          ticker_sentiment_label: "Bearish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.706626",
          ticker_sentiment_score: "0.133326",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Google Is Now the AI Top Dog. The Stock Keeps Rising After $4 Trillion Milestone.",
      url: "https://www.barrons.com/articles/alphabet-stock-google-trillion-74a8ba6b?gaa_at=eafs&gaa_n=AWEtsqdfB0SHr1nzJVDDLdwNJNkL00Ye-NyDvR7mOjzIclQIvjFcqUrmweDv&gaa_ts=69664b23&gaa_sig=RA-laZWWLqSrusbt096gHtCZ39lfXqD-u-lGNKcyTTF1bR-vgDp3Iq3USq1kJ217-XBWJyN9JpoVIEJr6ZmH3g%3D%3D",
      time_published: "20260113T124527",
      authors: ["George Glover"],
      summary:
        "Google's parent company, Alphabet, has joined the $4 trillion club, extending its record-breaking stock run. This surge is attributed to Google's strengthened position as an AI leader, particularly with its Gemini AI powering Apple's new AI features. The development solidifies Google's status as a top artificial-intelligence performer in the market.",
      banner_image:
        "https://images.barrons.com/im-95440341?width=700&height=467",
      source: "Barron's",
      category_within_source: "General",
      source_domain: "Barron's",
      topics: [
        {
          topic: "technology",
          relevance_score: "1.000000",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.941215",
        },
      ],
      overall_sentiment_score: 0.447308,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "GOOGL",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.605150",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.726043",
          ticker_sentiment_score: "0.213980",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "Should You Buy the Dip in Capital One Stock? What Barchart Options Data Says.",
      url: "https://www.barchart.com/story/news/37014264/should-you-buy-the-dip-in-capital-one-stock-what-barchart-options-data-says",
      time_published: "20260113T122644",
      authors: ["Wajeeh Khan"],
      summary:
        "Capital One (COF) stock experienced a significant drop after former President Donald Trump proposed a one-year cap on credit card interest rates at 10%. Despite this, Barchart options data indicates a temporary dip, with options traders expecting a recovery and analysts maintaining a \"Strong Buy\" rating for COF due to the unlikelihood of Trump's proposal gaining congressional support and the stock's underlying uptrend and dividend yield.",
      banner_image:
        "https://media.barchart.com/contributors-admin/common-images/images/S%26P%20500%20Companies/Financial%20(names%20A%20-%20I)/Capital%20One%20Financial%20Corp_%20bank%20exterior-by%20Brett_Hondow%20via%20iStock.jpg",
      source: "Barchart.com",
      category_within_source: "General",
      source_domain: "Barchart.com",
      topics: [
        {
          topic: "financial_markets",
          relevance_score: "0.921220",
        },
        {
          topic: "finance",
          relevance_score: "0.800022",
        },
        {
          topic: "economy_fiscal",
          relevance_score: "0.747891",
        },
      ],
      overall_sentiment_score: 0.124983,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "COF",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.284839",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NFLX",
          relevance_score: "0.550251",
          ticker_sentiment_score: "-0.215008",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.554850",
          ticker_sentiment_score: "0.220990",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.597412",
          ticker_sentiment_score: "0.196468",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "JPMorgan Chase (NYSE:JPM) Reports Q4 CY2025 In Line With Expectations",
      url: "https://finviz.com/news/274578/jpmorgan-chase-nyse-jpm-reports-q4-cy2025-in-line-with-expectations",
      time_published: "20260113T120033",
      authors: ["Petr Huřťák"],
      summary:
        "JPMorgan Chase (NYSE:JPM) reported Q4 CY2025 results, meeting Wall Street's revenue expectations with a 6.9% year-on-year sales increase to $46.77 billion. The company's non-GAAP profit of $5.23 per share exceeded analysts' consensus estimates by 7.7%, and its tangible book value per share also slightly beat expectations. Despite strong performance in these areas, the article also notes a mediocre compounded annual revenue growth rate over the last five years.",
      banner_image:
        "https://news-assets.stockstory.org/cover-images/_1400x700_crop_center-center_none/jpmorgan-chase-cover-image-5b24b72c7879_2025-05-20-175814_sdxk.jpeg",
      source: "Finviz",
      category_within_source: "General",
      source_domain: "Finviz",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.914533",
        },
        {
          topic: "finance",
          relevance_score: "0.740984",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.644423",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.645368",
        },
      ],
      overall_sentiment_score: 0.151581,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "0.951497",
          ticker_sentiment_score: "0.284112",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.724422",
          ticker_sentiment_score: "0.108932",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "KO",
          relevance_score: "0.616170",
          ticker_sentiment_score: "0.109922",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MNST",
          relevance_score: "0.594396",
          ticker_sentiment_score: "0.124927",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.727390",
          ticker_sentiment_score: "0.103632",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Productivity Surprise Supports 2026 Setup - WisdomTree, Inc. - Commentaries",
      url: "https://www.advisorperspectives.com/commentaries/2026/01/13/productivity-supports-2026",
      time_published: "20260113T115818",
      authors: ["Jeremy J. Siegel"],
      summary:
        "Jeremy J. Siegel of WisdomTree, Inc. discusses surprising macro data showing slow job growth but stable unemployment, coupled with a significant surge in output. This points to a powerful productivity surge driven by reduced low-productivity labor influx and increased technology investments, supporting disinflation without recession. Siegel anticipates continued equity strength, particularly in small caps and non-tech cyclicals, with international markets also becoming more compelling due to reasonable valuations and improved corporate governance.",
      banner_image: null,
      source: "Advisor Perspectives",
      category_within_source: "General",
      source_domain: "Advisor Perspectives",
      topics: [
        {
          topic: "economy_macro",
          relevance_score: "0.943256",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.808209",
        },
        {
          topic: "economy_monetary",
          relevance_score: "0.825647",
        },
        {
          topic: "earnings",
          relevance_score: "0.742775",
        },
      ],
      overall_sentiment_score: 0.184981,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "WT",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.432822",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.617322",
          ticker_sentiment_score: "0.105899",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "IBM",
          relevance_score: "0.607398",
          ticker_sentiment_score: "0.145997",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.609543",
          ticker_sentiment_score: "0.106989",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AMZN",
          relevance_score: "0.602761",
          ticker_sentiment_score: "0.117744",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "JPMorgan Chase & Co. Reports Fourth-Quarter 2025 Financial Results",
      url: "https://www.tradingview.com/news/tradingview:bc49086721230:0-jpmorgan-chase-co-reports-fourth-quarter-2025-financial-results/",
      time_published: "20260113T114456",
      authors: [],
      summary:
        "JPMorgan Chase & Co. announced strong fourth-quarter 2025 financial results, reporting a net income of $13.0 billion ($4.63 per share) and full-year net income of $57.0 billion. The company saw robust performance across its segments, with net revenue up 7% year-over-year, driven by increased net interest income and strategic investments like its partnership with Apple for credit card issuance. CEO Jamie Dimon highlighted increased Markets and Payments revenue, while also acknowledging potential economic hazards such as geopolitical conditions and inflation risks.",
      banner_image: null,
      source: "TradingView — Track All Markets",
      category_within_source: "General",
      source_domain: "TradingView — Track All Markets",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.900207",
        },
        {
          topic: "finance",
          relevance_score: "0.836640",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.625136",
        },
        {
          topic: "economy_macro",
          relevance_score: "0.613132",
        },
      ],
      overall_sentiment_score: 0.372689,
      overall_sentiment_label: "Bullish",
      ticker_sentiment: [
        {
          ticker: "JPM",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.414095",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.739354",
          ticker_sentiment_score: "0.313256",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
      ],
    },
    {
      title:
        "New York State Teachers Retirement System Cuts Position in VeriSign, Inc. $VRSN",
      url: "https://www.marketbeat.com/instant-alerts/filing-new-york-state-teachers-retirement-system-cuts-position-in-verisign-inc-vrsn-2026-01-13/",
      time_published: "20260113T113755",
      authors: ["MarketBeat"],
      summary:
        'The New York State Teachers Retirement System recently decreased its stake in VeriSign by 6.9%, now holding 70,512 shares valued at approximately $19.7 million. Despite this reduction, institutional ownership in VeriSign remains high at 92.90%, with several other large funds increasing their positions. Analysts maintain a "Hold" consensus rating for VRSN with a price target of $282.00, while insiders have sold a significant number of shares recently.',
      banner_image:
        "https://www.marketbeat.com/logos/verisign-inc-logo-1200x675.png",
      source: "MarketBeat",
      category_within_source: "General",
      source_domain: "MarketBeat",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.930649",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.800015",
        },
        {
          topic: "finance",
          relevance_score: "0.706913",
        },
      ],
      overall_sentiment_score: 0.082099,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "VRSN",
          relevance_score: "0.985918",
          ticker_sentiment_score: "-0.145400",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.613314",
          ticker_sentiment_score: "0.120621",
          ticker_sentiment_label: "Neutral",
        },
        {
          ticker: "GOOGL",
          relevance_score: "0.601527",
          ticker_sentiment_score: "0.215285",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.646403",
          ticker_sentiment_score: "0.222520",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.562072",
          ticker_sentiment_score: "-0.067677",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title: "Remote Code Execution With Modern AI/ML Formats and Libraries",
      url: "https://unit42.paloaltonetworks.com/rce-vulnerabilities-in-ai-python-libraries/",
      time_published: "20260113T112721",
      authors: ["Curtis Carmony"],
      summary:
        "Palo Alto Networks' Unit 42 identified remote code execution (RCE) vulnerabilities in three open-source AI/ML Python libraries: NVIDIA's NeMo, Salesforce's Uni2TS, and Apple/EPFL's FlexTok. These vulnerabilities arise from the libraries' use of metadata to configure complex models, which, when loaded, execute embedded malicious code. Although no in-the-wild exploits have been found, the affected vendors have released fixes, and Palo Alto Networks products offer protection.",
      banner_image: null,
      source: "Unit 42",
      category_within_source: "General",
      source_domain: "Unit 42",
      topics: [
        {
          topic: "technology",
          relevance_score: "0.946681",
        },
      ],
      overall_sentiment_score: -0.107348,
      overall_sentiment_label: "Neutral",
      ticker_sentiment: [
        {
          ticker: "PANW",
          relevance_score: "1.000000",
          ticker_sentiment_score: "0.257193",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "NVDA",
          relevance_score: "0.878891",
          ticker_sentiment_score: "-0.245241",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "CRM",
          relevance_score: "0.872061",
          ticker_sentiment_score: "-0.249043",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.836764",
          ticker_sentiment_score: "-0.238911",
          ticker_sentiment_label: "Somewhat-Bearish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.618980",
          ticker_sentiment_score: "0.080599",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
    {
      title:
        "Index Fund Advisors Inc. Has $1.26 Million Stock Position in Alphabet Inc. $GOOG",
      url: "https://www.marketbeat.com/instant-alerts/filing-index-fund-advisors-inc-has-126-million-stock-position-in-alphabet-inc-goog-2026-01-13/",
      time_published: "20260113T103546",
      authors: ["MarketBeat"],
      summary:
        'Index Fund Advisors Inc. significantly increased its stake in Alphabet Inc. ($GOOG) by 199.2% in the third quarter, now holding 5,161 shares valued at $1.26 million. The article notes strong analyst "Buy" ratings and a consensus price target of $318.18, driven by optimism for Alphabet\'s AI initiatives and recent partnerships. Despite positive sentiment from quarterly earnings beats and a new dividend, insider selling activities and some analyst downgrades temper the near-term outlook for the stock.',
      banner_image:
        "https://www.marketbeat.com/logos/google-inc-logo-1200x675.png",
      source: "MarketBeat",
      category_within_source: "General",
      source_domain: "MarketBeat",
      topics: [
        {
          topic: "earnings",
          relevance_score: "0.939688",
        },
        {
          topic: "technology",
          relevance_score: "0.830293",
        },
        {
          topic: "financial_markets",
          relevance_score: "0.745455",
        },
        {
          topic: "finance",
          relevance_score: "0.639431",
        },
      ],
      overall_sentiment_score: 0.296982,
      overall_sentiment_label: "Somewhat-Bullish",
      ticker_sentiment: [
        {
          ticker: "GOOGL",
          relevance_score: "0.991640",
          ticker_sentiment_score: "0.439102",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "GOOG",
          relevance_score: "0.932437",
          ticker_sentiment_score: "0.406361",
          ticker_sentiment_label: "Bullish",
        },
        {
          ticker: "AAPL",
          relevance_score: "0.746555",
          ticker_sentiment_score: "0.343934",
          ticker_sentiment_label: "Somewhat-Bullish",
        },
        {
          ticker: "MSFT",
          relevance_score: "0.648162",
          ticker_sentiment_score: "0.111570",
          ticker_sentiment_label: "Neutral",
        },
      ],
    },
  ],
};
