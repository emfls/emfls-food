export type CookingUnit = 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'g' | 'kg';
export type UnitCategory = 'volume' | 'mass';

export const COOKING_UNITS: Record<CookingUnit, { label: string; category: UnitCategory; baseValue: number }> = {
  ml: { label: 'ml', category: 'volume', baseValue: 1 },
  l: { label: 'L', category: 'volume', baseValue: 1000 },
  tsp: { label: '작은술 (tsp)', category: 'volume', baseValue: 5 },
  tbsp: { label: '큰술 (tbsp)', category: 'volume', baseValue: 15 },
  cup: { label: '컵', category: 'volume', baseValue: 200 },
  g: { label: 'g', category: 'mass', baseValue: 1 },
  kg: { label: 'kg', category: 'mass', baseValue: 1000 },
};

export type ConversionResult = { ok: true; value: number } | { ok: false; message: string };

export function convertCookingUnit(value: number, from: CookingUnit, to: CookingUnit): ConversionResult {
  if (!Number.isFinite(value)) return { ok: false, message: '숫자를 입력해 주세요.' };
  if (value < 0) return { ok: false, message: '음수는 변환할 수 없습니다.' };
  if (value > 100000) return { ok: false, message: '100,000 이하의 값을 입력해 주세요.' };
  if (COOKING_UNITS[from].category !== COOKING_UNITS[to].category) return { ok: false, message: 'g과 ml은 재료의 밀도에 따라 달라 직접 변환할 수 없습니다.' };
  return { ok: true, value: value * COOKING_UNITS[from].baseValue / COOKING_UNITS[to].baseValue };
}

export function formatConvertedValue(value: number): string {
  if (!Number.isFinite(value)) return '';
  const rounded = Math.round(value * 100) / 100;
  return rounded.toLocaleString('ko-KR', { maximumFractionDigits: 2 });
}
