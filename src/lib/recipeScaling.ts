const FRACTIONS: Array<[number, string]> = [[0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1 / 3, '1/3'], [2 / 3, '2/3']];

export function scaleAmount(amount: number | string, baseServings: number, targetServings: number): number | string {
  if (typeof amount !== 'number' || !Number.isFinite(amount) || baseServings <= 0 || targetServings <= 0) return amount;
  return amount * targetServings / baseServings;
}

function parseNumericText(amount: string): { value: number; suffix: string } | null {
  const match = amount.trim().match(/^(\d+(?:\.\d+)?|\d+\/\d+)(.*)$/);
  if (!match) return null;
  const value = match[1].includes('/') ? match[1].split('/').map(Number).reduce((a, b, index) => index === 0 ? a / b : a) : Number(match[1]);
  return Number.isFinite(value) ? { value, suffix: match[2] } : null;
}

export function formatAmount(amount: number | string, baseServings: number, targetServings: number): string {
  if (typeof amount === 'string') {
    const parsed = parseNumericText(amount);
    if (!parsed) return amount;
    return `${formatNumber(parsed.value * targetServings / baseServings)}${parsed.suffix}`;
  }
  return formatNumber(scaleAmount(amount, baseServings, targetServings) as number);
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '';
  const rounded = Math.round(value * 100) / 100;
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const match = FRACTIONS.find(([number]) => Math.abs(number - fraction) < 0.03);
  if (match) return whole > 0 ? `${whole} ${match[1]}` : match[1];
  return String(rounded).replace(/\.0+$/, '');
}
