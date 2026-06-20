// src/data/progressManager.js

const STORAGE_KEY = 'fattanza_progress';

const defaultProgress = {
  karma: 0,
  unlockedArchetypes: ['accademico', 'coltivatore'] // Quelli base sbloccati
};

export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultProgress, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error("Failed to parse progress", e);
  }
  return defaultProgress;
};

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const addKarma = (amount) => {
  const p = getProgress();
  p.karma += amount;
  saveProgress(p);
  return p;
};

export const unlockArchetype = (id, cost) => {
  const p = getProgress();
  if (p.karma >= cost && !p.unlockedArchetypes.includes(id)) {
    p.karma -= cost;
    p.unlockedArchetypes.push(id);
    saveProgress(p);
    return { success: true, progress: p };
  }
  return { success: false, progress: p };
};

export const exportProgress = () => {
  const p = getProgress();
  return btoa(JSON.stringify(p));
};

export const importProgress = (base64Str) => {
  try {
    const jsonStr = atob(base64Str);
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed.karma === 'number' && Array.isArray(parsed.unlockedArchetypes)) {
      saveProgress(parsed);
      return { success: true, progress: parsed };
    }
  } catch (e) {
    console.error("Invalid save string");
  }
  return { success: false };
};
