import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function readJson(fileName) {
  const filePath = path.join(CONTENT_DIR, fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export const getSiteContent = cache(() => readJson('site.json'));
export const getItemsNeeded = cache(() => readJson('items-needed.json'));
export const getPrograms = cache(() => readJson('programs.json'));
export const getDonateContent = cache(() => readJson('donate.json'));
export const getVolunteerContent = cache(() => readJson('volunteer.json'));

export async function getImpactStats() {
  const site = await getSiteContent();
  return site.impact ?? [];
}
