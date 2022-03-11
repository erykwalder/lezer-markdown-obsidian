# lezer-markdown-obsidian

This package is a set of extensions for [@lezer/markdown](https://github.com/lezer-parser/markdown) to add support for the Obsidian's added markdown syntax.

**Warning: This is not the parser that Obsidian itself uses. All parsing is a best attempt to match the way Obsidian parses markdown, and will not guarantee a 1-for-1 replication.**

If you recognize a difference in parsing, please open an issue.

## `parser`

The simplest was to use the library if you want full obsidian parsing is to import the parser:

```typescript
import { parser } from "lezer-markdown-obsidian";

const tree = parser.parse("# Some Markdown");
```

This parser includes all the extensions below, as well as the `Strikethrough` and `Table` extensions from `@lezer/markdown`.

## Extensions

You can configure your own parser with specific extensions:

```typescript
import { parser as mdParser } from "@lezer/markdown";
import { Comment, InternalLink } from "lezer-markdown-obsidian";

const parser = mdParser.configure([Comment, InternalLink]);
```

### `Extensions`

An array of all the extensions for Obsidian's markdown syntax.

### `BlockAndInline`

An array of all the extensions except YAML frontmatter.

### `Comment`

This adds support for parsing comments in the form of: `%%comment%%`.

Comments that begin at the start of a line can span multiple lines, and will go to the end of the document unless terminated.

Comments that are inline must be completed on the same line.

### `Footnote`

This adds support for detecting footnotes and footnote references.

Footnotes are in the form of:
`This has a footnote.[^1]`

References are in the form of:
`[^1]: Here is some additional info.`

References can span multiple lines as long as they are not interrupted by another block.

### `Hashtag`

This adds support for hashtags. Hashtags are pretty flexible in what can be tagged, only forbidding certain special characters.

`#this-is-a-tag`

`#nested/tag`

### `InternalLink`

This adds support for internal links and embeds.

Internal links are structured like:
`[[File#heading|display]]`

Internal embeds are structured like:
`![[File#heading]]`

The `#heading` and `|display` parts are optional. Heading can be a `#^blockid` instead, and multiple headings can be chained together.

### `Mark`

This adds support for highlight marks in the form of `==highlighted==`.

### `TaskList`

This adds support for Obsidian's task lists, which allow support for arbitrary characters for tasks. This makes it different from GFM task lists.

Open tasks are in the form of:
`- [ ] This is an uncompleted task`

Completed tasks are in the form of:
`- [x] This is a completed task`

Special tasks can replace `x` with any character in the completed form.

### `Tex`

This adds support for LaTex style formulas, both inline and block level. In Obsidian, these are rendered with MathJax.

Inline is in the form of:
`Here is some math: $1 + 2 = 3$`

Block level is in the form of:

```
$$
\vec v = \vec a t
$$
```

**Warning: Obsidian can also parse blocks as inline elements, which is currently not supported.**

### `YAMLFrontmatter`

This adds support for a frontmatter block of YAML. The frontmatter must be the first block in the document, otherwise it is treated as markdown. The YAML must be surrounded by lines with `---`.

For example:

```
---
author: Eric
---
```

**If you are parsing subselections of a document, you will want to configure a parser that does not include `YAMLFrontmatter`, since it will be unable to distinguise horizontal rules from frontmatter.**
