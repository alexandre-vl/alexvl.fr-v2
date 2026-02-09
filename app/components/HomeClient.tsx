"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ProjectOverlay = dynamic(() => import("./ProjectOverlay"), {
    ssr: false,
});
import type { Project } from "../data/projects";

/**
 * Thin client wrapper — only holds the overlay state.
 * All grid content is server-rendered and passed as `children`.
 *
 * Supports `?project=<id>` query param for deep-linking from SEO project pages.
 */
export default function HomeClient({
    children,
    projects,
}: {
    children: React.ReactNode;
    projects: Project[];
}) {
    const [selected, setSelected] = useState<Project | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Auto-open project from ?project= query param (SEO redirect)
    useEffect(() => {
        const projectId = searchParams.get("project");
        if (projectId) {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
                setSelected(project);
                // Clean URL without triggering navigation
                router.replace("/", { scroll: false });
            }
        }
    }, [searchParams, projects, router]);

    const openProject = useCallback(
        (el: HTMLElement) => {
            const target = el.closest<HTMLElement>("[data-project-id]");
            if (!target) return;
            const id = target.dataset.projectId;
            const project = projects.find((p) => p.id === id);
            if (project) setSelected(project);
        },
        [projects]
    );

    const handleTileClick = useCallback(
        (e: React.MouseEvent) => openProject(e.target as HTMLElement),
        [openProject]
    );

    const handleTileKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProject(e.target as HTMLElement);
            }
        },
        [openProject]
    );

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onClick={handleTileClick} onKeyDown={handleTileKeyDown}>{children}</div>
            {selected && (
                <ProjectOverlay
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
}

