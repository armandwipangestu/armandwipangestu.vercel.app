import { marked } from "marked";
import Link from "next/link";

export default function Toc({ content }) {
  const tokens = marked.lexer(content);
  const headings = tokens.filter((token, i) => token.type === "heading");

  return (
    <>
      {headings != 0 && (
        <aside>
          <nav>
            <h2>Daftar Isi</h2>
            <ul>
              {headings.map((heading, i) => {
                switch (heading.depth) {
                  case 1: {
                    return (
                      <li key={i} data-depth={heading.depth}>
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                  case 2: {
                    return (
                      <li key={i} data-depth={heading.depth} className="ml-4">
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                  case 3: {
                    return (
                      <li key={i} data-depth={heading.depth} className="ml-8">
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                  case 4: {
                    return (
                      <li key={i} data-depth={heading.depth} className="ml-12">
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                  case 5: {
                    return (
                      <li key={i} data-depth={heading.depth} className="ml-16">
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                  case 5: {
                    return (
                      <li key={i} data-depth={heading.depth} className="ml-20">
                        <Link
                          href={`#${heading.text
                            .replace(/[,\s]/g, "-")
                            .toLowerCase()}`}
                          legacyBehavior
                        >
                          <a>{heading.text}</a>
                        </Link>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}
