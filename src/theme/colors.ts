export const colors = {
  background: '#FAFAFA',
  loginBackground: '#F7F7F8',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F2',
  surfaceSelected: '#F6EBFA',
  primary: '#8B5CF6',
  primaryAccent: '#BD2BF2',
  textPrimary: '#242424',
  textSecondary: '#686868',
  textCaption: '#636363',
  textMuted: '#989898',
  border: '#C4C4C4',
  borderMuted: '#B5B5B5',
  borderLight: '#EDEDED',
  error: '#FF383C',
  vialPink: '#EC4899',
  vialTeal: '#14B8A6',
} as const;

export const gradients = {
  brand: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryAccent} 100%)`,
  brandReversed: `linear-gradient(90deg, ${colors.primaryAccent} 0%, ${colors.primary} 100%)`,
} as const;
