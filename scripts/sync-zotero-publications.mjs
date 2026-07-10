import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const libraryType = process.env.ZOTERO_LIBRARY_TYPE || "user";
const libraryId = process.env.ZOTERO_LIBRARY_ID || process.env.ZOTERO_USER_ID;
const collectionKey = process.env.ZOTERO_COLLECTION_KEY;
const apiKey = process.env.ZOTERO_API_KEY;
const outputPath = resolve(
  process.env.ZOTERO_PUBLICATIONS_OUTPUT || "content/publications.json",
);

const librarySegment = libraryType === "group" ? "groups" : "users";
const excludedTypes = new Set(["attachment", "note", "annotation"]);

if (!libraryId || !collectionKey) {
  console.error(
    [
      "Missing Zotero configuration.",
      "Set ZOTERO_LIBRARY_ID and ZOTERO_COLLECTION_KEY.",
      "Use ZOTERO_LIBRARY_TYPE=group for group libraries, otherwise it defaults to user.",
    ].join("\n"),
  );
  process.exit(1);
}

function creatorName(creator) {
  if (!creator) return null;
  if (creator.name) return creator.name;

  return [creator.firstName, creator.lastName].filter(Boolean).join(" ") || null;
}

function yearFromDate(date) {
  if (!date) return null;

  const match = String(date).match(/\b(1[5-9]\d{2}|20\d{2}|21\d{2})\b/);
  return match ? Number(match[1]) : null;
}

function doiUrl(doi) {
  if (!doi) return null;

  return `https://doi.org/${String(doi).replace(/^https?:\/\/doi\.org\//i, "")}`;
}

function firstUrl(...values) {
  return values.find((value) => typeof value === "string" && value.trim()) || null;
}

function normalizeItem(item) {
  const data = item.data || {};
  const creators = Array.isArray(data.creators) ? data.creators : [];
  const authors = creators
    .filter((creator) => !creator.creatorType || creator.creatorType === "author")
    .map(creatorName)
    .filter(Boolean);

  return {
    key: data.key,
    itemType: data.itemType,
    title: data.title || "Untitled",
    authors,
    year: yearFromDate(data.date),
    date: data.date || null,
    publicationTitle:
      data.publicationTitle || data.bookTitle || data.proceedingsTitle || null,
    publisher: data.publisher || null,
    volume: data.volume || null,
    issue: data.issue || null,
    pages: data.pages || null,
    doi: data.DOI || null,
    url: firstUrl(doiUrl(data.DOI), data.url, item.links?.alternate?.href),
    abstract: data.abstractNote || null,
    zoteroUrl: item.links?.alternate?.href || null,
    citation: typeof item.bib === "string" ? item.bib : null,
    updatedAt: data.dateModified || null,
  };
}

async function fetchPage(start) {
  const url = new URL(
    `https://api.zotero.org/${librarySegment}/${libraryId}/collections/${collectionKey}/items/top`,
  );

  url.searchParams.set("format", "json");
  url.searchParams.set("include", "data,bib");
  url.searchParams.set("style", process.env.ZOTERO_CITATION_STYLE || "apa");
  url.searchParams.set("limit", "100");
  url.searchParams.set("start", String(start));
  url.searchParams.set("sort", process.env.ZOTERO_SORT || "date");
  url.searchParams.set("direction", process.env.ZOTERO_DIRECTION || "desc");

  const headers = {
    "Zotero-API-Version": "3",
  };

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Zotero API request failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  const total = Number(response.headers.get("total-results") || "0");
  return {
    total,
    items: await response.json(),
  };
}

const collected = [];
let total = 0;

do {
  const page = await fetchPage(collected.length);
  total = page.total;
  collected.push(...page.items);
} while (collected.length < total);

const publications = collected
  .filter((item) => !excludedTypes.has(item.data?.itemType))
  .map(normalizeItem);

const payload = {
  generatedAt: new Date().toISOString(),
  source: {
    provider: "zotero",
    libraryType,
    libraryId,
    collectionKey,
  },
  items: publications,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(`${outputPath}.tmp`, `${JSON.stringify(payload, null, 2)}\n`);
await rename(`${outputPath}.tmp`, outputPath);

console.log(`Wrote ${publications.length} publications to ${outputPath}`);
