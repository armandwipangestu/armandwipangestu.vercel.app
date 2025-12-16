import { MainLayout } from "@/components/layout";
import {
    HeroSection,
    AboutSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
    CertificationsSection,
} from "@/components/sections";

export default function Home() {
    return (
        <MainLayout>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <CertificationsSection />
            <ProjectsSection />
        </MainLayout>
    );
}
