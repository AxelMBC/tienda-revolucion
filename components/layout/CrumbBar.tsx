import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./CrumbBar.module.css";

export interface Crumb {
  label: string;
  href?: string;
}

interface CrumbBarProps {
  crumbs: Crumb[];
  pager?: ReactNode;
}

export function CrumbBar({ crumbs, pager }: CrumbBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <nav aria-label="Migas de pan" className={styles.crumbs}>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={i} style={{ display: "contents" }}>
                {c.href && !isLast ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span className={isLast ? styles.current : undefined}>
                    {c.label}
                  </span>
                )}
                {!isLast && (
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        {pager && <div className={styles.pager}>{pager}</div>}
      </div>
    </div>
  );
}

interface PagerLinkProps {
  href: string;
  direction: "back" | "forward";
  children: ReactNode;
}

export function PagerLink({ href, direction, children }: PagerLinkProps) {
  return (
    <Link href={href}>
      {direction === "back" && (
        <span className={styles.arrow}>←</span>
      )}
      {direction === "back" ? " " : ""}
      {children}
      {direction === "forward" && (
        <>
          {" "}
          <span className={styles.arrow}>→</span>
        </>
      )}
    </Link>
  );
}
