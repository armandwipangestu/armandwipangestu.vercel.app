const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string;
    body: string;
    html_url: string;
    published_at: string;
    prerelease: boolean;
    draft: boolean;
}

export interface ReleaseInfo {
    version: string;
    name: string;
    description: string;
    publishedAt: string;
    url: string;
    isPrerelease: boolean;
}

/**
 * Fetch latest release from a GitHub Repository
 */
export async function fetchLatestRelease(
    owner: string,
    repo: string
): Promise<ReleaseInfo> {
    const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/latest`,
        {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch latest release: ${response.status} ${response.statusText}`
        );
    }

    const data: GitHubRelease = await response.json();

    return {
        version: data.tag_name,
        name: data.name || data.tag_name,
        description: data.body || "",
        publishedAt: data.published_at,
        url: data.html_url,
        isPrerelease: data.prerelease,
    };
}

/**
 * Fetch all releases from a GitHub Repository
 */
export async function fetchReleases(
    owner: string,
    repo: string,
    perPage: number = 10
) : Promise<ReleaseInfo[]> {
    const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases?per_page=${perPage}`,
        {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        }
    )

    if (!response.ok) {
        throw new Error(
            `Failed to fetch releases: ${response.status} ${response.statusText}`
        )
    }

    const data: GitHubRelease[] = await response.json()

    return data.map((release) => ({
        version: release.tag_name,
        name: release.name || release.tag_name,
        description: release.body || "",
        publishedAt: release.published_at,
        url: release.html_url,
        isPrerelease: release.prerelease,
    }))
}