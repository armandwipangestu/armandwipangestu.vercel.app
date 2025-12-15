"use client";

import { useQuery } from "@tanstack/react-query";
import {
    fetchLatestRelease,
    fetchReleases,
    fetchRepoInfo,
    type ReleaseInfo,
    type RepoInfo,
} from "@/lib/api/github";

// Query keys for caching
export const githubKeys = {
    all: ["github"] as const,
    releases: (owner: string, repo: string) =>
        [...githubKeys.all, "releases", owner, repo] as const,
    latestRelease: (owner: string, repo: string) =>
        [...githubKeys.all, "latest-release", owner, repo] as const,
    repoInfo: (owner: string, repo: string) =>
        [...githubKeys.all, "repo-info", owner, repo] as const,
};

interface UseLatestReleaseOptions {
    owner: string;
    repo: string;
    enabled?: boolean;
}

/**
 * Hook to fetch latest release from GitHub
 */
export function useLatestRelease({
    owner,
    repo,
    enabled = true,
}: UseLatestReleaseOptions) {
    return useQuery<ReleaseInfo, Error>({
        queryKey: githubKeys.latestRelease(owner, repo),
        queryFn: () => fetchLatestRelease(owner, repo),
        enabled,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
}

interface UseReleasesOptions {
    owner: string;
    repo: string;
    perPage?: number;
    enabled?: boolean;
}

/**
 * Hook to fetch all releases from GitHub
 */
export function useReleases({
    owner,
    repo,
    perPage = 10,
    enabled = true,
}: UseReleasesOptions) {
    return useQuery<ReleaseInfo[], Error>({
        queryKey: githubKeys.releases(owner, repo),
        queryFn: () => fetchReleases(owner, repo, perPage),
        enabled,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
}

interface UseRepoInfoOptions {
    owner: string;
    repo: string;
    enabled?: boolean;
}

/**
 * Hook to fetch repository info from GitHub
 */
export function useRepoInfo({
    owner,
    repo,
    enabled = true,
}: UseRepoInfoOptions) {
    return useQuery<RepoInfo, Error>({
        queryKey: githubKeys.repoInfo(owner, repo),
        queryFn: () => fetchRepoInfo(owner, repo),
        enabled,
        staleTime: 60 * 60 * 1000, // 1 hour
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
    });
}
