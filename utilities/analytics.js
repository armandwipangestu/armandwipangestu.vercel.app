import { gaEvent } from './ga';
import { phCapture } from './posthog';

const hoveredSkills = new Set();

export const trackSkillHover = (skillName) => {
  // prevent spam: only once per page load per skill
  if (hoveredSkills.has(skillName)) return;
  hoveredSkills.add(skillName);

  gaEvent({
    action: 'skill_hovered',
    category: 'skills',
    label: skillName,
  });

  phCapture('skill_hovered', {
    skill: skillName,
    location: 'skills_section',
  });
};