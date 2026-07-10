function visit(node, parent, enter, leave, prop, index) {
  if (!node || typeof node.type !== "string") return node;

  let shouldSkip = false;
  let removed = false;
  let replacement = node;

  const context = {
    skip() {
      shouldSkip = true;
    },
    remove() {
      removed = true;
    },
    replace(value) {
      replacement = value;
    },
  };

  enter?.call(context, replacement, parent, prop, index);

  if (removed) return null;

  if (!shouldSkip) {
    for (const key of Object.keys(replacement)) {
      const value = replacement[key];

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i += 1) {
          const child = value[i];
          if (!child || typeof child.type !== "string") continue;

          const next = visit(child, replacement, enter, leave, key, i);
          if (next === null) {
            value.splice(i, 1);
            i -= 1;
          } else {
            value[i] = next;
          }
        }
      } else if (value && typeof value.type === "string") {
        const next = visit(value, replacement, enter, leave, key, null);
        if (next === null) {
          delete replacement[key];
        } else {
          replacement[key] = next;
        }
      }
    }
  }

  leave?.call(context, replacement, parent, prop, index);

  if (removed) return null;
  return replacement;
}

export function walk(ast, { enter, leave } = {}) {
  return visit(ast, null, enter, leave, null, null) || ast;
}

export async function asyncWalk(ast, visitors = {}) {
  return walk(ast, visitors);
}

export default {
  walk,
  asyncWalk,
};
