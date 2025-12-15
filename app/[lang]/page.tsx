import { MainLayout } from "@/components/layout";
import {
    HeroSection,
    AboutSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
} from "@/components/sections";

export default function Home() {
    return (
        <MainLayout>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
        </MainLayout>
    );
}
