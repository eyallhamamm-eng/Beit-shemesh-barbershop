import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ColorMode = "default" | "contrast" | "mono";

export type A11yState = {
  scale: number; // root font-size in percent
  colorMode: ColorMode;
  links: boolean;
  stopMotion: boolean;
};

const DEFAULTS: A11yState = { scale: 100, colorMode: "default", links: false, stopMotion: false };
export const SCALE_MIN = 90;
export const SCALE_MAX = 150;
export const SCALE_STEP = 10;
const STORAGE_KEY = "site-a11y";

type Ctx = A11yState & {
  update: (patch: Partial<A11yState>) => void;
  reset: () => void;
};

const A11yContext = createContext<Ctx | null>(null);

const read = (): A11yState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
};

export const A11ySettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<A11yState>(read);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = state.scale === 100 ? "" : `${state.scale}%`;
    root.classList.toggle("a11y-contrast", state.colorMode === "contrast");
    root.classList.toggle("a11y-mono", state.colorMode === "mono");
    root.classList.toggle("a11y-links", state.links);
    root.classList.toggle("a11y-no-motion", state.stopMotion);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const update = useCallback((patch: Partial<A11yState>) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState(DEFAULTS), []);

  const value = useMemo(() => ({ ...state, update, reset }), [state, update, reset]);
  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
};

export const useA11ySettings = () => {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11ySettings must be used inside A11ySettingsProvider");
  return ctx;
};
