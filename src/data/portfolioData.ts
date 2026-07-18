import {
  experienceBase,
  freelanceProjectsBase,
  sideProjectsBase,
  skillCategoriesBase,
  type ExperienceBase,
  type ProjectBase,
  type SkillCategoryBase,
} from "@/data/portfolioBase";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export interface Project {
  uniqueId: string;
  title: string;
  description: string;
  img: string;
  techs: string[];
  live: string;
  source?: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  id: number;
  company: string;
  companyUrl?: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  bullets: string[];
}

function mergeProjects(base: ProjectBase[], locale: Locale): Project[] {
  const dict = getDictionary(locale);

  return base.map((item) => {
    const translation = dict.projects.items[item.uniqueId];

    return {
      uniqueId: item.uniqueId,
      img: item.img,
      techs: item.techs,
      live: item.live,
      source: item.source,
      title: translation?.title ?? item.uniqueId,
      description: translation?.description ?? "",
    };
  });
}

export function getSideProjects(locale: Locale): Project[] {
  return mergeProjects(sideProjectsBase, locale);
}

export function getFreelanceProjects(locale: Locale): Project[] {
  return mergeProjects(freelanceProjectsBase, locale);
}

export function getSkillCategories(locale: Locale): SkillCategory[] {
  const dict = getDictionary(locale);

  return skillCategoriesBase.map((category: SkillCategoryBase) => ({
    ...category,
    title: dict.skills.categories[category.id]?.title ?? category.icon,
  }));
}

export function getExperienceItems(locale: Locale): ExperienceItem[] {
  const dict = getDictionary(locale);

  return experienceBase.map((item: ExperienceBase) => {
    const translation = dict.journey.items[item.id];

    return {
      id: item.id,
      company: item.company,
      companyUrl: item.companyUrl,
      location: item.location,
      role: translation?.role ?? "",
      duration: translation?.duration ?? "",
      type: dict.journey.workTypes[item.type],
      bullets: translation?.bullets ?? [],
    };
  });
}

export function getFocusAreas(locale: Locale): string[] {
  return getDictionary(locale).about.focusAreas;
}

// Backward-compatible exports for any legacy imports
export const sideProjects = getSideProjects("en");
export const freelanceProjects = getFreelanceProjects("en");
export const skillCards = getSkillCategories("en");
export const experienceData = getExperienceItems("en");
export const focusAreas = getFocusAreas("en");

export type { ExperienceBase, ProjectBase, SkillCategoryBase };
