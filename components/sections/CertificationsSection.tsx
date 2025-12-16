"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Award, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

// Types
interface Certification {
    id: string;
    title: string;
    issuer: string;
    issuerLogo?: string;
    image: string;
    issuedDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
}

interface CertificationsDict {
    label: string;
    title: string;
    description: string;
    viewCredential: string;
    issuedOn: string;
    expiresOn: string;
    noExpiry: string;
    credentialId: string;
    whatILearned: string;
    items: Certification[];
}

interface Dictionary {
    certifications?: CertificationsDict;
    [key: string]: unknown;
}

interface CertificationCardProps {
    certification: Certification;
    onClick: () => void;
}

function CertificationCard({ certification, onClick }: CertificationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: "-10%" }}
            onClick={onClick}
            className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
        >
            {/* Certificate Image */}
            <div className="relative aspect-[4/3] bg-muted">
                <Image
                    src={certification.image}
                    alt={certification.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
                        <Award className="w-3 h-3" />
                        View Details
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {certification.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {certification.issuer}
                </p>
            </div>
        </motion.div>
    );
}

interface CertificationModalProps {
    certification: Certification;
    dict: CertificationsDict;
    onClose: () => void;
}

function CertificationModal({
    certification,
    dict,
    onClose,
}: CertificationModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Certificate Image */}
                <div className="relative aspect-video bg-muted">
                    <Image
                        src={certification.image}
                        alt={certification.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 672px) 100vw, 672px"
                    />
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        {certification.issuerLogo && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                                <Image
                                    src={certification.issuerLogo}
                                    alt={certification.issuer}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold text-foreground mb-1">
                                {certification.title}
                            </h2>
                            <p className="text-muted-foreground">
                                {certification.issuer}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Issued Date */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    {dict.issuedOn}
                                </p>
                                <p className="text-sm font-medium">
                                    {certification.issuedDate}
                                </p>
                            </div>
                        </div>

                        {/* Expiry Date */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    {dict.expiresOn}
                                </p>
                                <p className="text-sm font-medium">
                                    {certification.expiryDate || dict.noExpiry}
                                </p>
                            </div>
                        </div>

                        {/* Credential ID */}
                        {certification.credentialId && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
                                <Hash className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        {dict.credentialId}
                                    </p>
                                    <p className="text-sm font-medium font-mono truncate">
                                        {certification.credentialId}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {certification.description && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground">
                                {dict.whatILearned}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {certification.description}
                            </p>
                        </div>
                    )}

                    {/* View Credential Button */}
                    {certification.credentialUrl && (
                        <Button asChild className="w-full">
                            <a
                                href={certification.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {dict.viewCredential}
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function CertificationsSection() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(
        null
    );
    const { dictionary } = useDictionary();

    const dict = dictionary as Dictionary | null;

    // Default values
    const defaultCertificationsDict: CertificationsDict = {
        label: "CERTIFICATIONS",
        title: "Certifications & Awards",
        description:
            "Professional certifications and achievements I've earned.",
        viewCredential: "View Credential",
        issuedOn: "Issued On",
        expiresOn: "Expires On",
        noExpiry: "No Expiration",
        credentialId: "Credential ID",
        whatILearned: "What I Learned",
        items: [],
    };

    const certificationsDict =
        dict?.certifications || defaultCertificationsDict;
    const certifications = certificationsDict.items || [];

    if (!dict) {
        return (
            <section id="certifications" className="py-20 md:py-32">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-6" />
                        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                        <div className="h-16 w-full bg-muted animate-pulse rounded mb-12" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-[4/3] bg-muted animate-pulse rounded-2xl"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="certifications" className="py-20 md:py-32">
                <div className="section-container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Label */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xs text-muted-foreground tracking-widest uppercase mb-6"
                        >
                            {certificationsDict.label}
                        </motion.p>

                        {/* Title */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                        >
                            {certificationsDict.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-muted-foreground leading-relaxed mb-12"
                        >
                            {certificationsDict.description}
                        </motion.p>

                        {/* Certifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map((cert) => (
                                <CertificationCard
                                    key={cert.id}
                                    certification={cert}
                                    onClick={() => setSelectedCert(cert)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <CertificationModal
                        certification={selectedCert}
                        dict={certificationsDict}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
