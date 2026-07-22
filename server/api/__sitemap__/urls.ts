export default defineSitemapEventHandler(async (event) => {
  const pages = await queryCollection(event, 'pages').all()
  const generatedPages = ['/projects', '/blog', '/aiwalks']

  return [
    ...generatedPages.map((loc) => ({ loc })),
    ...pages
    .filter((page) => page.path !== '/footer' && !page.path.startsWith('/news/'))
    .map((page) => ({
      loc: page.path,
      lastmod: page.date || undefined
    }))
  ]
})
