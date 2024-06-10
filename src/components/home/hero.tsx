import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto my-40">
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="home_h1">
                        The bellscoin boilerplate.
                    </h1>
                    <a href="" rel="noopener noreferrer">
                        <div className="button-and-note">
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="button"
                                className="cta-button"
                                duration={1}
                            >
                                Some super cool action
                            </HoverBorderGradient>

                        </div>
                    </a>
                </div>
                <Image src="/hero-dog.png" alt="Bellscoin" width={600} height={400} />
            </div>
        </div>
    );
}
