"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import SkeletonImage from "./SkeletonImage";
import { CloseIcon, ExternalLinkIcon, GithubIcon } from "./Icons";
import type { Project } from "../data/projects";

interface Props {
    project: Project;
    onClose: () => void;
}

function ChevronLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
        </svg>
    );
}

export default function ProjectOverlay({ project, onClose }: Props) {
    const [closing, setClosing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const images = project.images;
    const hasMultiple = images.length > 1;

    const handleClose = useCallback(() => {
        setClosing(true);
        setTimeout(onClose, 180);
    }, [onClose]);

    // Keyboard: Escape to close, arrows to navigate
    useEffect(() => {
        document.body.classList.add("no-scroll");
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (hasMultiple && e.key === "ArrowRight") setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
            if (hasMultiple && e.key === "ArrowLeft") setCurrentIndex((i) => Math.max(i - 1, 0));
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.classList.remove("no-scroll");
            window.removeEventListener("keydown", onKey);
        };
    }, [handleClose, hasMultiple, images.length]);

    // Touch/mouse drag handlers
    const handleDragStart = (clientX: number) => {
        dragStartX.current = clientX;
        isDraggingRef.current = true;
        setIsDragging(true);
        setDragOffset(0);
    };

    const handleDragMove = (clientX: number) => {
        if (!isDraggingRef.current || dragStartX.current === null) return;
        const diff = clientX - dragStartX.current;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);
        const threshold = 60;
        if (dragOffset < -threshold && currentIndex < images.length - 1) {
            setCurrentIndex((i) => i + 1);
        } else if (dragOffset > threshold && currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
        }
        setDragOffset(0);
        dragStartX.current = null;
    };

    return (
        <div
            className={`overlay ${closing ? "closing" : ""}`}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="overlay-card" role="dialog" aria-modal="true" aria-label={project.name}>
                {/* Image carousel */}
                <div className="overlay-carousel">
                    <div
                        ref={containerRef}
                        className="overlay-carousel-track"
                        style={{
                            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                        }}
                        onMouseDown={(e) => { if (hasMultiple) { e.preventDefault(); handleDragStart(e.clientX); } }}
                        onMouseMove={(e) => handleDragMove(e.clientX)}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={(e) => { if (hasMultiple) handleDragStart(e.touches[0].clientX); }}
                        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                        onTouchEnd={handleDragEnd}
                    >
                        {images.map((src, i) => (
                            <div key={i} className="overlay-carousel-slide">
                                <SkeletonImage
                                    src={src}
                                    alt={`${project.name} — screenshot ${i + 1}`}
                                    fill
                                    sizes="640px"
                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                    priority={i === 0}
                                    draggable={false}
                                    wrapperClassName="overlay-carousel-skeleton"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    {hasMultiple && currentIndex > 0 && (
                        <button
                            className="overlay-carousel-arrow overlay-carousel-arrow-left"
                            onClick={() => setCurrentIndex((i) => i - 1)}
                            aria-label="Previous image"
                        >
                            <ChevronLeftIcon />
                        </button>
                    )}
                    {hasMultiple && currentIndex < images.length - 1 && (
                        <button
                            className="overlay-carousel-arrow overlay-carousel-arrow-right"
                            onClick={() => setCurrentIndex((i) => i + 1)}
                            aria-label="Next image"
                        >
                            <ChevronRightIcon />
                        </button>
                    )}

                    {/* Dots indicator */}
                    {hasMultiple && (
                        <div className="overlay-carousel-dots">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    className={`overlay-carousel-dot ${i === currentIndex ? "active" : ""}`}
                                    onClick={() => setCurrentIndex(i)}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    <button className="overlay-close" onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <div className="overlay-body">
                    <div className="overlay-accent" style={{ background: project.accentColor }} />
                    <h2 className="overlay-title">{project.name}</h2>
                    <p className="overlay-type">{project.type}</p>
                    <p className="overlay-desc">{project.description}</p>

                    <div className="overlay-meta">
                        <div className="overlay-meta-item">
                            <span className="overlay-meta-label">Role</span>
                            <span className="overlay-meta-value">{project.role}</span>
                        </div>
                        <div className="overlay-meta-item">
                            <span className="overlay-meta-label">Year</span>
                            <span className="overlay-meta-value">{project.year}</span>
                        </div>
                    </div>

                    <div className="overlay-tags">
                        {project.tech.map((t) => (
                            <span key={t} className="overlay-tag">{t}</span>
                        ))}
                    </div>

                    <div className="overlay-links">
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="overlay-link overlay-link-primary">
                                <ExternalLinkIcon /> Visit Website
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="overlay-link overlay-link-secondary">
                                <GithubIcon /> View Source
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
