"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SkeletonImageProps extends Omit<ImageProps, "onLoad"> {
    /** Extra class for the wrapper div */
    wrapperClassName?: string;
    /** Extra styles for the wrapper div */
    wrapperStyle?: React.CSSProperties;
}

/**
 * Image component with built-in skeleton shimmer.
 * Shows a warm-toned shimmer animation until the image has fully loaded,
 * then fades the image in over 300ms.
 */
export default function SkeletonImage({
    wrapperClassName = "",
    wrapperStyle,
    style,
    alt,
    ...imageProps
}: SkeletonImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`skeleton-image-wrapper ${!loaded ? "skeleton-image-loading" : ""} ${wrapperClassName}`}
            style={wrapperStyle}
        >
            <Image
                {...imageProps}
                alt={alt}
                style={{
                    ...style,
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
