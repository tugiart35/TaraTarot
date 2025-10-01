/*
 * Merkezi Tema Konfigürasyonu
 * Tüm UI bileşenleri için ortak tema sistemi
 */

export type Theme =
  | 'default'
  | 'amber'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'green'
  | 'emerald'
  | 'red'
  | 'orange'
  | 'yellow';

export interface ThemeConfig {
  container: string;
  simpleButton: {
    selected: string;
    unselected: string;
    focus: string;
  };
  detailedButton: {
    selected: string;
    unselected: string;
    focus: string;
    disabled: string;
  };
  messages: {
    simple: string;
    detailed: string;
    adminRequired: string;
    noSelection: string;
  };
}

export const themeConfig: Record<Theme, ThemeConfig> = {
  default: {
    container: 'bg-slate-800/80 border-slate-700',
    simpleButton: {
      selected: 'bg-blue-500/80 text-white shadow-md',
      unselected: 'bg-slate-700/60 text-blue-200 hover:bg-blue-500/30',
      focus: 'focus:ring-blue-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-slate-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-slate-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-blue-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  amber: {
    container: 'bg-amber-800/80 border-amber-700',
    simpleButton: {
      selected: 'bg-amber-500/80 text-white shadow-md',
      unselected: 'bg-amber-700/60 text-amber-200 hover:bg-amber-500/30',
      focus: 'focus:ring-amber-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-amber-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-amber-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-amber-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  pink: {
    container: 'bg-pink-800/80 border-pink-700',
    simpleButton: {
      selected: 'bg-pink-500/80 text-white shadow-md',
      unselected: 'bg-pink-700/60 text-pink-200 hover:bg-pink-500/30',
      focus: 'focus:ring-pink-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-pink-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-pink-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-pink-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  purple: {
    container: 'bg-purple-800/80 border-purple-700',
    simpleButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-purple-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
    },
    detailedButton: {
      selected: 'bg-indigo-500/80 text-white shadow-md',
      unselected: 'bg-purple-700/60 text-indigo-200 hover:bg-indigo-500/30',
      focus: 'focus:ring-indigo-400',
      disabled: 'bg-purple-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-purple-400',
      detailed: 'text-indigo-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  blue: {
    container: 'bg-blue-800/80 border-blue-700',
    simpleButton: {
      selected: 'bg-blue-500/80 text-white shadow-md',
      unselected: 'bg-blue-700/60 text-blue-200 hover:bg-blue-500/30',
      focus: 'focus:ring-blue-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-blue-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-blue-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-blue-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  green: {
    container: 'bg-green-800/80 border-green-700',
    simpleButton: {
      selected: 'bg-green-500/80 text-white shadow-md',
      unselected: 'bg-green-700/60 text-green-200 hover:bg-green-500/30',
      focus: 'focus:ring-green-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-green-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-green-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-green-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  emerald: {
    container: 'bg-emerald-800/80 border-emerald-700',
    simpleButton: {
      selected: 'bg-emerald-500/80 text-white shadow-md',
      unselected: 'bg-emerald-700/60 text-emerald-200 hover:bg-emerald-500/30',
      focus: 'focus:ring-emerald-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-emerald-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-emerald-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-emerald-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  red: {
    container: 'bg-red-800/80 border-red-700',
    simpleButton: {
      selected: 'bg-red-500/80 text-white shadow-md',
      unselected: 'bg-red-700/60 text-red-200 hover:bg-red-500/30',
      focus: 'focus:ring-red-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-red-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-red-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-red-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  orange: {
    container: 'bg-orange-800/80 border-orange-700',
    simpleButton: {
      selected: 'bg-orange-500/80 text-white shadow-md',
      unselected: 'bg-orange-700/60 text-orange-200 hover:bg-orange-500/30',
      focus: 'focus:ring-orange-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-orange-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-orange-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-orange-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
  yellow: {
    container: 'bg-yellow-800/80 border-yellow-700',
    simpleButton: {
      selected: 'bg-yellow-500/80 text-white shadow-md',
      unselected: 'bg-yellow-700/60 text-yellow-200 hover:bg-yellow-500/30',
      focus: 'focus:ring-yellow-400',
    },
    detailedButton: {
      selected: 'bg-purple-500/80 text-white shadow-md',
      unselected: 'bg-yellow-700/60 text-purple-200 hover:bg-purple-500/30',
      focus: 'focus:ring-purple-400',
      disabled: 'bg-yellow-800/60 text-gray-400',
    },
    messages: {
      simple: 'text-yellow-400',
      detailed: 'text-purple-400',
      adminRequired: 'text-amber-400',
      noSelection: 'text-gray-400',
    },
  },
};

// Yardımcı fonksiyon
export const getTheme = (theme: Theme): ThemeConfig => {
  return themeConfig[theme] || themeConfig.default;
};
