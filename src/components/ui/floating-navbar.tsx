"use client";

import React, { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { INintondo, initNintondo } from "nintondo-sdk";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ModeToggle } from "@/components/layout/ThemeToggle/theme-toggle";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [nintondo, setNintondo] = useState<INintondo | undefined>();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // setNintondo(initNintondo());

    useEffect(() => {
        const initializeNintondo = () => {
            if ((window as any).nintondo) {
                console.log("Nintondo provider found");
                const instance = initNintondo();
                console.log("Nintondo instance initialized:", instance);
                setNintondo(instance);
            } else {
                console.log("Nintondo provider not found, checking periodically");
                const interval = setInterval(() => {
                    if ((window as any).nintondo) {
                        console.log("Nintondo provider found during interval check");
                        const instance = initNintondo();
                        console.log("Nintondo instance initialized:", instance);
                        setNintondo(instance);
                        clearInterval(interval);
                    }
                }, 500);
            }
        };

        initializeNintondo();
    }, []);

    const connectWallet = async () => {
        if (nintondo) {
            try {
                console.log("Attempting to connect wallet");
                await nintondo.provider.connect();
                const address = await nintondo.provider.getAccount();
                console.log("Wallet connected, address:", address);
                setWalletAddress(address);
            } catch (error) {
                console.error("Failed to connect wallet:", error);
            }
        } else {
            console.error("Nintondo instance is not initialized");
        }
    };

    useMotionValueEvent(scrollYProgress as MotionValue<number>, "change", (current) => {
        if (typeof current === "number") {
            const previous = scrollYProgress.getPrevious();
            if (previous !== undefined) {
                let direction = current - previous;

                if (scrollYProgress.get() < 0.05) {
                    setVisible(true);
                } else {
                    if (direction < 0) {
                        setVisible(true);
                    } else {
                        setVisible(false);
                    }
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-7xl mx-auto fixed top-5 inset-x-0 border border-transparent dark:border-white/[0.2] rounded-md dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-between space-x-4",
                    className
                )}
            >
                <div className="flex items-center space-x-4">
                    <Link href={""} target="_blank">
                        <Image
                            src="/bells-logo.png"
                            alt="Bellscoin"
                            className="dark:invert"
                            width={48}
                            height={48}
                            priority
                        />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {navItems.map((navItem: any, idx: number) => (
                        <Link
                            key={`link=${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                            )}
                        >
                            <span className="block sm:hidden">{navItem.icon}</span>
                            <span className="hidden sm:block text-sm">{navItem.name}</span>
                        </Link>
                    ))}
                    <ModeToggle />
                    <a onClick={connectWallet} className="flex items-center">
                        <HoverBorderGradient
                            containerClassName="hover-border-gradient-wallet mr-4"
                            as="button"
                            className="wallet-button inline-block px-4 text-sm font-semibold rounded-full dark:bg-black bg-white dark:text-white text-black hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                            duration={1}
                        >
                            {walletAddress ? walletAddress : "Connect Wallet"}
                        </HoverBorderGradient>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
