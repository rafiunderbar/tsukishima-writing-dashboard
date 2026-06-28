/**
 * 公開リポジトリ用: dashboard-data.json からデータを読み込む。
 * Markdownパースは非公開リポのexportスクリプトが担当する。
 */
import fs from 'node:fs';
import path from 'node:path';
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'dashboard-data.json');

export interface GlossaryEntry {
  id: string;
  name: string;
  category: string;
  classification: string;
  description: string;
  type: 'character' | 'nation' | 'place' | 'term' | 'system' | 'force' | 'meta';
}

export interface Foreshadowing {
  id: string;
  name: string;
  role: string;
  resolution: string;
  phases?: { stage: string; detail: string }[];
}

export interface Chapter {
  number: number;
  title: string;
  status: 'completed' | 'draft' | 'concept';
  wordCount?: number;
  file: string;
}

export interface Character {
  id: string;
  name: string;
  shortName: string;
  description: string;
  classification: string;
  firstAppearance?: string;
  tags: string[];
  relations: { target: string; type: string }[];
}

export interface DashboardData {
  glossary: GlossaryEntry[];
  characters: Character[];
  chapters: Chapter[];
  foreshadowing: Foreshadowing[];
  stats: {
    totalCharacters: number;
    totalTerms: number;
    totalPlaces: number;
    totalNations: number;
    completedChapters: number;
    totalChapters: number;
    totalWords: number;
  };
}

const EMPTY: DashboardData = {
  glossary: [], characters: [], chapters: [], foreshadowing: [],
  stats: { totalCharacters: 0, totalTerms: 0, totalPlaces: 0, totalNations: 0, completedChapters: 0, totalChapters: 0, totalWords: 0 },
};

export function loadAllData(): DashboardData {
  if (!fs.existsSync(DATA_FILE)) {
    console.warn('dashboard-data.json が見つかりません。空のデータで表示します。');
    return EMPTY;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// 後方互換: 個別関数もエクスポート
export function parseGlossary(): GlossaryEntry[] { return loadAllData().glossary; }
export function parseForeshadowing(): Foreshadowing[] { return loadAllData().foreshadowing; }
export function parseChapters(): Chapter[] { return loadAllData().chapters; }
export function parseCharacters(): Character[] { return loadAllData().characters; }

