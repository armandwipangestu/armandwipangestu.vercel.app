import { marked } from "marked";
import Link from "next/link";

export default function Toc({ content }) {
  const tokens = marked.lexer(content);
  const headings = tokens.filter((token, i) => token.type === "heading");

  const getValidId = (text) => {
    return text
      .replace(/[^a-zA-Z0-9 ]/g, "") // Menghilangkan karakter non-alfanumerik
      .replace(/[,\s]+/g, "-") // Mengganti spasi dengan tanda hubung
      .toLowerCase(); // Mengubah huruf kapital menjadi huruf kecil
  };

  return (
    <>
      {headings != 0 && (
        <aside>
          <nav>
            <h2>Daftar Isi:</h2>
            <ul>
              {headings.map((heading, i) => {
                const id = getValidId(heading.text);

                return (
                  <li
                    key={i}
                    data-depth={heading.depth}
                    className={`ml-${heading.depth * 4}`}
                  >
                    <Link href={`#${id}`} legacyBehavior>
                      <a>{heading.text}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}
