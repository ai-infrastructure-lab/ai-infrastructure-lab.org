export const renderInlineMarkdown = (value?: string) => {
  if (!value) return "";

  const escaped = value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)(?:\{[^}]*target="_blank"[^}]*\})?/g,
    (_match, label: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`,
  );
};
