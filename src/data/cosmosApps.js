export const cosmosApps = [
  {
    id: 'cosmotime',
    name: 'CosmoTime',
    role: 'The Discovery Layer',
    tagline: 'Poetic Discovery & Astronomy',
    appIcon: '/assets/icons/cosmotime.png',
    summary: 'A fun, poetic astronomy experience. Journey through time and space with AI-generated cosmic stories and daily sky insights.',
    features: [
      {
        title: 'Universal Museum',
        desc: 'The complete timeline of the universe at your fingertips.',
        icon: 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93'
      },
      {
        title: 'Sky Insights',
        desc: 'Daily AI-generated observations personalized for your location.',
        icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
      }
    ],
    theme: {
      accent: 'text-cosmo-cyan',
      border: 'border-cosmo-cyan/30',
      bgGlow: 'bg-cosmo-cyan/5',
      primaryValue: '#00FFFF',
      secondaryValue: '#FFD700', // Gold
    },
    visual: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000', // Smooth nebula
    downloadUrl: 'https://apps.apple.com/it/app/cosmotime/id6761441228?l=en-GB'
  },
  {
    id: 'cosmoquest',
    name: 'CosmoQuest',
    role: 'The Scientific Layer',
    tagline: 'Analytical Explorer',
    appIcon: '/assets/icons/cosmoquest.png',
    summary: 'Scientific exploration platform powered by NASA data. Analyze transit signals, discover exoplanets, and collaborate with AI assistants.',
    features: [
      {
        title: 'CosmoGuide AI Assistant',
        desc: 'Expert guidance on scientific concepts and analysis.',
        icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
      },
      {
        title: 'Real NASA Data Integration',
        desc: 'Process light curves from TESS and Kepler missions.',
        icon: 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93'
      }
    ],
    theme: {
      accent: 'text-cosmo-violet',
      border: 'border-cosmo-violet/30',
      bgGlow: 'bg-cosmo-violet/10',
      primaryValue: '#7A00FF', // Violet
      secondaryValue: '#00D2FF', // Blue
    },
    visual: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000', // Data visualization earth
    downloadUrl: null
  },
  {
    id: 'cosmogen',
    name: 'Cosmic Genesis',
    role: 'The Simulation Layer',
    tagline: 'Strategic Evolution',
    appIcon: '/assets/icons/cosmogen.png',
    summary: 'Narrative-driven cosmic simulation. Guide civilizations through the great filter, shape planetary evolution, and witness the rise of AI intelligence.',
    features: [
      {
        title: 'Civilization Scale',
        desc: 'Evolution from primitive stages to advanced stellar societies.',
        icon: 'M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'
      },
      {
        title: 'Lumina AI Narrator',
        desc: 'Dynamic assistant balancing psychological evolution.',
        icon: 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93'
      }
    ],
    theme: {
      accent: 'text-cosmo-aurora',
      border: 'border-cosmo-aurora/40',
      bgGlow: 'bg-cosmo-aurora/5',
      primaryValue: '#00FFD1', // Aurora green
      secondaryValue: '#180B3A', // Indigo
    },
    visual: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=1000', // Aurora style deep space
    downloadUrl: null
  }
];
