import Link from "next/link";
import Image from "next/image";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";

export default function Footer() {
    const footerStyle = {
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        color: '#333',
        maxWidth: '1280px',
        margin: '0 auto',
        marginTop: '2rem',
        borderRadius: '1rem 1rem 0 0'
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    };

    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center'
    };

    const iconContainerStyle = {
        display: 'flex',
        gap: '1rem'
    };

    const disclosureTextStyle = {
        fontSize: '0.75rem',
        lineHeight: '1.5',
        color: '#666',
        marginTop: '2rem'
    };

    return (
        <div style={footerStyle}>
            <nav style={navStyle}>
                <div style={logoContainerStyle}>
                    <Link href={""} target="_blank">
                        <Image
                            src="/bells-logo.png"
                            alt="Bells Logo"
                            width={48}
                            height={48}
                            priority
                        />
                    </Link>
                </div>
                <div style={iconContainerStyle}>
                    <Link href="" target="_blank" aria-label="Twitter">
                        <IconBrandTwitter size={24} />
                    </Link>
                    <Link href="" target="_blank" aria-label="Instagram">
                        <IconBrandInstagram size={24} />
                    </Link>
                    <Link href="" target="_blank" aria-label="YouTube">
                        <IconBrandYoutube size={24} />
                    </Link>
                </div>
            </nav>

        </div>
    );
}
