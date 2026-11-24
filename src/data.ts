import { BrandConfig, CatalogItem, ProductItem, ProductPart, ProductSegment } from './types';

import heroComplexImg from './assets/images/hero_zaynova_complex_1794574356826.jpg';
import globalGlobeImg from './assets/images/global_presence_globe_1794574357167.jpg';
import catalogCoverImg from './assets/images/catalog_cover_2026_1794571323060.jpg';

import heroSlideBrushcutterImg from './assets/images/hero_slide_brushcutter_1794575342296.jpg';
import heroSlideChainsawImg from './assets/images/hero_slide_chainsaw_1794575342737.jpg';
import heroSlideTillerImg from './assets/images/hero_slide_tiller_1794575342450.jpg';
import heroSlideConstructionImg from './assets/images/hero_slide_construction_1794575343369.jpg';

import studioZaynovaBrushcutterImg from './assets/images/studio_zaynova_brushcutter_1794575692759.jpg';
import studioZaynovaChainsawImg from './assets/images/studio_zaynova_chainsaw_1794575692996.jpg';
import studioZaynovaTillerImg from './assets/images/studio_zaynova_tiller_1794575694009.jpg';
import studioZaynovaSolarImg from './assets/images/studio_zaynova_solar_1794575697078.jpg';
import studioZaynovaSprayerImg from './assets/images/studio_zaynova_sprayer_1794575696085.jpg';
import studioZaynovaGenPumpImg from './assets/images/studio_zaynova_generator_pump_1794575717722.jpg';
import studioZaynovaWasherImg from './assets/images/studio_zaynova_washer_1794575717161.jpg';
import studioZaynovaConstructionImg from './assets/images/studio_zaynova_construction_1794575719890.jpg';
import studioZaynovaPowerToolsImg from './assets/images/studio_zaynova_powertools_1794575717867.jpg';

import explodedBrushcutterImg from './assets/images/exploded_brushcutter_parts_1794572081251.jpg';
import explodedChainsawImg from './assets/images/exploded_chainsaw_parts_1794572081629.jpg';
import explodedBlowerWasherImg from './assets/images/exploded_blower_washer_parts_1794572081583.jpg';
import explodedOhvEngineImg from './assets/images/exploded_ohv_engine_pump_1794572815815.jpg';
import explodedPowerToolImg from './assets/images/exploded_powertool_gearbox_1794572816032.jpg';

export const HERO_IMAGE = heroSlideBrushcutterImg;
export const HERO_COMPLEX_IMAGE = heroComplexImg;
export const GLOBAL_GLOBE_IMAGE = globalGlobeImg;

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  seriesCode: string;
  title: string;
  subtitle: string;
  targetProductId?: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-brushcutter',
    imageUrl: heroSlideBrushcutterImg,
    seriesCode: 'ZYN-BC SERIES',
    title: 'Brush Cutters & Multi-Function Clearing Systems',
    subtitle: '28mm Spline Transmission · ZAYNOVA Field Gear',
    targetProductId: 'line-brushcutters',
  },
  {
    id: 'slide-chainsaw',
    imageUrl: heroSlideChainsawImg,
    seriesCode: 'ZYN-CS SERIES',
    title: 'Magnesium-Case Timber Chainsaws & Forestry',
    subtitle: 'Nikasil Cylinders · 25.4cc – 91.6cc Class',
    targetProductId: 'line-chainsaws',
  },
  {
    id: 'slide-tiller',
    imageUrl: heroSlideTillerImg,
    seriesCode: 'ZYN-PT SERIES',
    title: 'Gear-Drive Power Tillers & Agro Processing',
    subtitle: 'OHV & EFI Cultivation · Heavy Soil Torque',
    targetProductId: 'line-tillers',
  },
  {
    id: 'slide-construction',
    imageUrl: heroSlideConstructionImg,
    seriesCode: 'ZYN-CM SERIES',
    title: 'Plate Compactors, Mixers & Silent Generators',
    subtitle: 'Civil Infrastructure & Jobsite Power',
    targetProductId: 'line-construction',
  },
  {
    id: 'slide-campus',
    imageUrl: heroComplexImg,
    seriesCode: 'ZAYNOVA HQ',
    title: 'ISO 9001 Automated Manufacturing & Export Complex',
    subtitle: '500-Hour Dynamometer Validation & Global Dispatch',
  },
];

export const EXPLODED_IMAGES = {
  brushcutter: explodedBrushcutterImg,
  chainsaw: explodedChainsawImg,
  pumpTurbine: explodedBlowerWasherImg,
  ohvEnginePump: explodedOhvEngineImg,
  powerToolGearbox: explodedPowerToolImg,
  precisionCnc: catalogCoverImg,
};

export const ALL_SEGMENTS: ProductSegment[] = [
  'Agro-Industrial Machinery',
  'Garden & Forestry',
  'Diesel Machines',
  'Electric Machines',
  'Solar',
  'Spraying & Crop Protection',
  'Water Pumps & Fluid',
  'Engines & Power Generation',
  'Pressure Washing & Cleaning',
  'Air Compressors',
  'Industrial Equipment',
  'Construction Equipment',
  'Wood & Agro Processing',
  'Special Machinery',
  'Power Tools',
  'Hand & Garden Tools',
  'Spare Parts & Aftermarket',
];

export const CHAINSAW_PARTS: ProductPart[] = [
  {
    id: 'cs-p1',
    partCode: 'OEM-CS-101',
    name: 'Die-Cast Magnesium Crankcase & Rear Grip',
    material: 'AZ91D Magnesium Alloy',
    functionDesc: 'High-strength vibration-damped structural housing supporting bearing seats and oil reservoir.',
    serviceInterval: 'Lifetime Structural',
    xPercent: 16,
    yPercent: 56,
  },
  {
    id: 'cs-p2',
    partCode: 'OEM-CS-204',
    name: 'Nikasil-Plated Cylinder & Dual-Ring Piston',
    material: 'ADC12 Aluminum + Nikasil Bore',
    functionDesc: 'Deep-finned thermal dissipation block engineered for continuous tropical timber felling.',
    serviceInterval: '1,200 Hours Inspect',
    xPercent: 32,
    yPercent: 34,
  },
  {
    id: 'cs-p3',
    partCode: 'OEM-CS-308',
    name: 'Three-Piece Forged Steel Crankshaft',
    material: '20CrMnTi Case-Hardened Steel',
    functionDesc: 'Balanced needle-bearing connecting rod assembly withstanding 13,500 RPM peak loads.',
    serviceInterval: '1,500 Hours',
    xPercent: 41,
    yPercent: 52,
  },
  {
    id: 'cs-p4',
    partCode: 'OEM-CS-412',
    name: 'All-Position Diaphragm Carburetor',
    material: 'CNC Anodized Aluminum / Viton',
    functionDesc: 'Compensated metering chamber maintaining steady air-fuel ratio at any cutting angle.',
    serviceInterval: '300 Hours Clean',
    xPercent: 49,
    yPercent: 35,
  },
  {
    id: 'cs-p5',
    partCode: 'OEM-CS-519',
    name: 'Quick-Stop Inertia Chain Brake Assembly',
    material: 'Glass-Filled Nylon + Spring Steel',
    functionDesc: 'Halts saw chain rotation within 0.12 seconds upon kickback impact.',
    serviceInterval: '250 Hours Check',
    xPercent: 62,
    yPercent: 33,
  },
  {
    id: 'cs-p6',
    partCode: 'OEM-CS-622',
    name: 'Centrifugal Clutch Drum & Rim Sprocket',
    material: 'Sintered Alloy Steel',
    functionDesc: '3-shoe spring clutch transferring smooth torque to 3/8" or .325" drive chain.',
    serviceInterval: '400 Hours',
    xPercent: 53,
    yPercent: 55,
  },
  {
    id: 'cs-p7',
    partCode: 'OEM-CS-735',
    name: 'Laminated Alloy Guide Bar & Hardened Chain',
    material: '65Mn Spring Steel',
    functionDesc: 'Induction-hardened rails with replaceable sprocket nose for low-friction cutting.',
    serviceInterval: '150 Hours Flip/Sharpen',
    xPercent: 86,
    yPercent: 54,
  },
];

export const BRUSHCUTTER_PARTS: ProductPart[] = [
  {
    id: 'bc-p1',
    partCode: 'OEM-BC-102',
    name: 'Forced-Air 2-Stroke Cylinder & Spark Head',
    material: 'Die-Cast Aluminum / Hard Chrome Bore',
    functionDesc: 'High-scavenging transfer port cylinder providing sustained low-end brush clearing torque.',
    serviceInterval: '1,000 Hours',
    xPercent: 18,
    yPercent: 25,
  },
  {
    id: 'bc-p2',
    partCode: 'OEM-BC-211',
    name: 'Forged Piston, Con-Rod & Crankshaft',
    material: 'Forged 40Cr Alloy Steel',
    functionDesc: 'Precision-ground crankpins with dual ball bearings for minimal shaft vibration.',
    serviceInterval: '1,200 Hours',
    xPercent: 30,
    yPercent: 46,
  },
  {
    id: 'bc-p3',
    partCode: 'OEM-BC-315',
    name: 'Cooling Flywheel & Centrifugal Clutch',
    material: 'Cast Zinc-Aluminum + Sintered Shoes',
    functionDesc: 'Engages drive shaft smoothly above 3,400 RPM while cooling crankcase fins.',
    serviceInterval: '500 Hours',
    xPercent: 43,
    yPercent: 53,
  },
  {
    id: 'bc-p4',
    partCode: 'OEM-BC-405',
    name: 'Multi-Function Throttle & Safety Lock Grip',
    material: 'Reinforced Polyamide + Elastomer',
    functionDesc: 'Integrated kill switch, throttle trigger, and cruise lock for fatigue-free shifts.',
    serviceInterval: '500 Hours Inspect',
    xPercent: 51,
    yPercent: 27,
  },
  {
    id: 'bc-p5',
    partCode: 'OEM-BC-518',
    name: '28mm 9-Spline Hardened Drive Shaft',
    material: '7075-T6 Tube / 45# Carbon Steel Rod',
    functionDesc: 'Five bronze-oilless dampening bushings prevent whip across 1.5m shaft length.',
    serviceInterval: '300 Hours Grease',
    xPercent: 67,
    yPercent: 54,
  },
  {
    id: 'bc-p6',
    partCode: 'OEM-BC-620',
    name: '30° Spiral Bevel Gear Head Assembly',
    material: '20CrMnTi Spiral Gears / Alloy Housing',
    functionDesc: 'High-torque reduction gear box sealed against dust, sap, and wet grass.',
    serviceInterval: '50 Hours Grease',
    xPercent: 80,
    yPercent: 52,
  },
  {
    id: 'bc-p7',
    partCode: 'OEM-BC-740',
    name: '40T Tungsten Carbide Clearing Blade',
    material: '65Mn Plate + YG8 Carbide Tips',
    functionDesc: 'Laser-balanced 255mm circular blade engineered for dense woody scrub and saplings.',
    serviceInterval: '120 Hours Replace',
    xPercent: 92,
    yPercent: 53,
  },
];

export const OHV_ENGINE_PUMP_PARTS: ProductPart[] = [
  {
    id: 'ohv-p1',
    partCode: 'OEM-ENG-110',
    name: 'Crankcase Cover & TCI Ignition Module',
    material: 'High-Pressure Die-Cast Aluminum',
    functionDesc: 'Houses oil sensor, camshaft governor gear, and solid-state electronic ignition coil.',
    serviceInterval: '1,000 Hours',
    xPercent: 13,
    yPercent: 52,
  },
  {
    id: 'ohv-p2',
    partCode: 'OEM-ENG-214',
    name: 'Forged Alloy Crankshaft & Helical Drive Gear',
    material: '42CrMo Forged Steel',
    functionDesc: 'Dynamic counterweighted crankshaft driving PTO shaft or alternator rotor.',
    serviceInterval: '2,000 Hours',
    xPercent: 26,
    yPercent: 52,
  },
  {
    id: 'ohv-p3',
    partCode: 'OEM-ENG-322',
    name: 'OHV Cylinder Head & Rocker Valve Train',
    material: 'ADC12 Finned Alloy + Nitride Valves',
    functionDesc: 'Overhead valve geometry optimizing fuel burn efficiency and thermal cooling.',
    serviceInterval: '300 Hours Valve Lash',
    xPercent: 48,
    yPercent: 28,
  },
  {
    id: 'ohv-p4',
    partCode: 'OEM-ENG-418',
    name: 'Piston Assembly & Cast-Iron Cylinder Block',
    material: 'GG25 Cast-Iron Liner / Hypereutectic Piston',
    functionDesc: 'Compression-ring piston moving inside honed cast-iron bore for 500-hr endurance.',
    serviceInterval: '1,500 Hours Rings',
    xPercent: 34,
    yPercent: 42,
  },
  {
    id: 'ohv-p5',
    partCode: 'OEM-ENG-530',
    name: 'Heavy-Duty Recoil Starter & Cooling Shroud',
    material: 'Stamped Steel + Braided Nylon Cord',
    functionDesc: 'High-engagement steel pawl starter with directional airflow shroud.',
    serviceInterval: '500 Hours Inspect',
    xPercent: 64,
    yPercent: 52,
  },
  {
    id: 'ohv-p6',
    partCode: 'OEM-PMP-640',
    name: '100% Copper Alternator Stator & Centrifugal Impeller',
    material: 'Class-H Enameled Copper / Cast Iron Impeller',
    functionDesc: 'Delivers pure sinusoidal power generation or high-head agricultural water flow.',
    serviceInterval: '1,200 Hours Seals',
    xPercent: 84,
    yPercent: 54,
  },
];

export const PUMP_TURBINE_PARTS: ProductPart[] = [
  {
    id: 'pt-p1',
    partCode: 'OEM-PT-104',
    name: 'High-Velocity Curved Aluminum Turbine Impeller',
    material: 'Precision-Balanced ADC12 Aluminum',
    functionDesc: '14-blade radial fan generating 1,420 m³/h airflow at 102 m/s nozzle velocity.',
    serviceInterval: '1,000 Hours',
    xPercent: 20,
    yPercent: 55,
  },
  {
    id: 'pt-p2',
    partCode: 'OEM-PT-209',
    name: 'Thermal Powerhead Cylinder & Piston Block',
    material: 'Cast Iron Sleeve + Aluminum Fin Block',
    functionDesc: 'Continuous-duty combustion chamber rated for 500-hour industrial dyno endurance.',
    serviceInterval: '100 Hours Oil/Filter',
    xPercent: 40,
    yPercent: 34,
  },
  {
    id: 'pt-p3',
    partCode: 'OEM-PT-318',
    name: 'Forged Brass Triplex 3-Plunger Pump Manifold',
    material: 'CW617N Forged Brass + Ceramic Pistons',
    functionDesc: 'Triple ceramic-coated stainless plungers delivering 220 Bar (3,200 PSI) continuous flow.',
    serviceInterval: '300 Hours Seals',
    xPercent: 66,
    yPercent: 62,
  },
  {
    id: 'pt-p4',
    partCode: 'OEM-PT-425',
    name: 'Stainless Steel Pressure Unloader & Bypass Valve',
    material: '304 Stainless Steel / Viton O-Rings',
    functionDesc: 'Regulates output bar pressure and relieves pump head load when trigger is released.',
    serviceInterval: '500 Hours',
    xPercent: 85,
    yPercent: 36,
  },
];

export const POWERTOOL_GEARBOX_PARTS: ProductPart[] = [
  {
    id: 'tl-p1',
    partCode: 'OEM-PTL-101',
    name: 'Impact-Resistant Glass-Nylon Clamshell Housing',
    material: 'PA6-GF30 + TPE Overmold',
    functionDesc: 'Drop-tested ergonomic outer shell with sealed dust-labyrinth cooling vents.',
    serviceInterval: 'Lifetime Structural',
    xPercent: 18,
    yPercent: 38,
  },
  {
    id: 'tl-p2',
    partCode: 'OEM-PTL-208',
    name: '21V 10-Cell High-Discharge Li-Ion Pack & BMS',
    material: '21700 INR Cells + Smart MOSFET PCB',
    functionDesc: 'Delivers 4.0Ah–6.0Ah high-current output with thermal & over-discharge protection.',
    serviceInterval: '800 Charge Cycles',
    xPercent: 36,
    yPercent: 68,
  },
  {
    id: 'tl-p3',
    partCode: 'OEM-PTL-315',
    name: 'High-Torque Brushless Outrunner Stator Motor',
    material: 'Neodymium Magnets + 200°C Copper',
    functionDesc: 'Sensorless BLDC stator providing 40% longer runtime and zero carbon brush wear.',
    serviceInterval: 'Maintenance-Free',
    xPercent: 50,
    yPercent: 48,
  },
  {
    id: 'tl-p4',
    partCode: 'OEM-PTL-422',
    name: '2-Speed Hardened Planetary Steel Gearbox',
    material: '20CrMnTi Powder-Metallurgy Gears',
    functionDesc: 'Multi-stage sun & planet gear carrier delivering up to 115 Nm fastening torque.',
    serviceInterval: '500 Hours Grease',
    xPercent: 67,
    yPercent: 46,
  },
  {
    id: 'tl-p5',
    partCode: 'OEM-PTL-530',
    name: '13mm Ratcheting Metal Keyless Chuck & Spindle',
    material: 'Heat-Treated Chrome-Vanadium Steel',
    functionDesc: 'Carbide-tipped jaws with automatic spindle lock for heavy masonry & steel drilling.',
    serviceInterval: '1,000 Hours',
    xPercent: 83,
    yPercent: 35,
  },
];

export function getDefaultExplodedBlueprint(category: ProductSegment): {
  explodedImageUrl: string;
  parts: ProductPart[];
} {
  switch (category) {
    case 'Garden & Forestry':
    case 'Spraying & Crop Protection':
    case 'Hand & Garden Tools':
      return { explodedImageUrl: explodedBrushcutterImg, parts: BRUSHCUTTER_PARTS };
    case 'Pressure Washing & Cleaning':
      return { explodedImageUrl: explodedBlowerWasherImg, parts: PUMP_TURBINE_PARTS };
    case 'Power Tools':
    case 'Electric Machines':
    case 'Industrial Equipment':
      return { explodedImageUrl: explodedPowerToolImg, parts: POWERTOOL_GEARBOX_PARTS };
    case 'Agro-Industrial Machinery':
    case 'Diesel Machines':
    case 'Solar':
    case 'Water Pumps & Fluid':
    case 'Engines & Power Generation':
    case 'Air Compressors':
    case 'Construction Equipment':
    case 'Wood & Agro Processing':
    case 'Special Machinery':
      return { explodedImageUrl: explodedOhvEngineImg, parts: OHV_ENGINE_PUMP_PARTS };
    case 'Spare Parts & Aftermarket':
    default:
      return { explodedImageUrl: explodedChainsawImg, parts: CHAINSAW_PARTS };
  }
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  // 1. BRUSH CUTTERS & MULTI-FUNCTION GARDEN TOOLS
  {
    id: 'line-brushcutters',
    sku: 'ZYN-BC Series',
    name: 'Brush Cutters, Grass Trimmers & Multi-Tools',
    name_es: 'Desbrozadoras, Cortacéspedes y Multiherramientas',
    name_pt: 'Roçadeiras, Aparadores e Multiferramentas',
    name_fr: 'Débroussailleuses, Coupe-Bordures & Outils Multifonctions',
    name_ar: 'قاطعات الأعشاب والأدوات متعددة المهام',
    name_de: 'Freischneider, Rasentrimmer & Kombisysteme',
    category: 'Garden & Forestry',
    powerSpec: '1.25 – 2.2 kW',
    displacement: '32.6 – 52 cc',
    weight: '7.4 – 9.8 kg',
    description:
      'Side-pack and backpack brush cutters, heavy-duty grass trimmers, and 4-in-1 multi-function garden clearing systems engineered with 28mm hardened spline drive shafts.',
    imageUrl: studioZaynovaBrushcutterImg,
    explodedImageUrl: explodedBrushcutterImg,
    parts: BRUSHCUTTER_PARTS,
    status: 'Export Ready',
    highlights: [
      '28mm 9-Spline Anti-Vibration Alloy Transmission',
      'Chrome-Plated Cylinder + Dual-Ring Forged Crankshaft',
      'Includes Carbide Clearing Blade & Heavy Nylon Head',
    ],
    subModels: [
      {
        sku: 'ZYN-BC520',
        name: 'ZYN-BC520 Side-Pack Heavy Brush Cutter',
        powerSpec: '2.1 kW / 2.8 HP',
        displacement: '51.7 cc 2T',
        weight: '8.1 kg',
        application: 'Dense timber undergrowth, roadside clearing & plantations',
      },
      {
        sku: 'ZYN-BP520',
        name: 'ZYN-BP520 Backpack Flexible-Shaft Brush Cutter',
        powerSpec: '2.1 kW / 2.8 HP',
        displacement: '51.7 cc 2T',
        weight: '9.8 kg',
        application: 'Steep terraced terrain, orchards & mountain slopes',
      },
      {
        sku: 'ZYN-BC430',
        name: 'ZYN-BC430 Pro Commercial Brushcutter',
        powerSpec: '1.65 kW / 2.2 HP',
        displacement: '42.7 cc 2T',
        weight: '7.6 kg',
        application: 'Agricultural weeding, pasture & municipal parks',
      },
      {
        sku: 'ZYN-MT430',
        name: 'ZYN-MT430 4-in-1 Multi-Function Garden System',
        powerSpec: '1.65 kW / 2.2 HP',
        displacement: '42.7 cc 2T',
        weight: '8.9 kg',
        application: 'Interchangeable Trimmer, Blade, Pole Saw & Hedge Cutter',
      },
      {
        sku: 'ZYN-GT330',
        name: 'ZYN-GT330 Lightweight Grass Trimmer',
        powerSpec: '1.25 kW / 1.7 HP',
        displacement: '32.6 cc 2T',
        weight: '6.8 kg',
        application: 'Landscape edging, estate maintenance & turf trim',
      },
    ],
  },

  // 2. CHAINSAWS, HEDGE TRIMMERS & EARTH AUGERS
  {
    id: 'line-chainsaws',
    sku: 'ZYN-CS Series',
    name: 'Chainsaws, Hedge Trimmers, Mowers & Augers',
    name_es: 'Motosierras, Cortasetos, Cortacésped y Ahoyadores',
    name_pt: 'Motosserras, Podadores, Cortadores e Perfuradores',
    name_fr: 'Tronçonneuses, Taille-Haies, Tondeuses & Tarières',
    name_ar: 'مناشير الجنزير وقصاصات السياج ومثاقب التربة',
    name_de: 'Motorsägen, Heckenscheren, Rasenmäher & Erdbohrer',
    category: 'Garden & Forestry',
    powerSpec: '1.8 – 5.2 kW',
    displacement: '25.4 – 91.6 cc',
    weight: '5.1 – 34.0 kg',
    description:
      'High-torque forestry chainsaws with magnesium crankcases alongside commercial hedge trimmers, earth augers, and gasoline/electric lawn mowers.',
    imageUrl: studioZaynovaChainsawImg,
    explodedImageUrl: explodedChainsawImg,
    parts: CHAINSAW_PARTS,
    status: 'Export Ready',
    highlights: [
      'Die-Cast Magnesium Alloy Crankcase & Inertia Chain Brake',
      'Nikasil-Plated High-Compression Cylinder Architecture',
      'Available in 16" / 20" / 24" / 30" Guide Bar Configurations',
    ],
    subModels: [
      {
        sku: 'ZYN-CS660',
        name: 'ZYN-CS660 Pro Timber Felling Chainsaw',
        powerSpec: '5.2 kW / 7.0 HP',
        displacement: '91.6 cc 2T',
        weight: '7.4 kg',
        application: 'Hardwood forestry felling & heavy sawmill bucking',
      },
      {
        sku: 'ZYN-CS580',
        name: 'ZYN-CS580 Heavy Agro & Orchard Chainsaw',
        powerSpec: '2.6 kW / 3.5 HP',
        displacement: '58.0 cc 2T',
        weight: '5.4 kg',
        application: 'Farm clearing, firewood & arborist cutting',
      },
      {
        sku: 'ZYN-HT600',
        name: 'ZYN-HT600 Dual-Reciprocating Hedge Trimmer',
        powerSpec: '0.85 kW / 600mm',
        displacement: '25.4 cc 2T',
        weight: '5.1 kg',
        application: 'Ornamental hedges, tea estates & civic landscaping',
      },
      {
        sku: 'ZYN-EA630',
        name: 'ZYN-EA630 Commercial Post-Hole Earth Auger',
        powerSpec: '2.2 kW / 100–300mm',
        displacement: '63.3 cc 2T',
        weight: '10.2 kg',
        application: 'Fencing posts, orchard planting & solar mounting piles',
      },
      {
        sku: 'ZYN-LM530',
        name: 'ZYN-LM530 Self-Propelled Gasoline & Electric Lawn Mower',
        powerSpec: '3.6 kW / 530mm',
        displacement: '196 cc / 2,000W',
        weight: '34.0 kg',
        application: 'Golf fairways, municipal turf & estate lawns',
      },
    ],
  },

  // 3. POWER TILLERS, CULTIVATORS & AGRO PROCESSING
  {
    id: 'line-tillers',
    sku: 'ZYN-PT Series',
    name: 'Power Tillers, Mini Cultivators & Agro Processing',
    name_es: 'Motocultores, Minicultivadores y Maquinaria Agrícola',
    name_pt: 'Motocultivadores, Enxadas Rotativas e Processamento',
    name_fr: 'Motoculteurs, Moto-bineuses & Traitement Agricole',
    name_ar: 'الحراثات الآلية والمزارعات الدوارة ومعالجة الحبوب',
    name_de: 'Motorhacken, Einachsschlepper & Agrarverarbeitung',
    category: 'Agro-Industrial Machinery',
    powerSpec: '3.0 – 11.0 kW',
    displacement: '160 – 420 cc EFI',
    weight: '42 – 185 kg',
    description:
      'Gear-driven agricultural mini cultivators, rotary power tillers, power weeders, wood chippers, log splitters, corn threshers, and chaff cutters.',
    imageUrl: studioZaynovaTillerImg,
    explodedImageUrl: explodedOhvEngineImg,
    parts: OHV_ENGINE_PUMP_PARTS,
    status: 'Export Ready',
    highlights: [
      'Direct All-Gear Cast Iron Transmission (2 Forward + 1 Reverse)',
      'Supports Ridger, Ditcher, Iron Paddy Wheels & Furrower',
      'Optional Electronic Fuel Injection (EFI) Engines',
    ],
    subModels: [
      {
        sku: 'ZYN-PT900',
        name: 'ZYN-PT900 Gear-Drive Power Tiller & Weeder',
        powerSpec: '5.2 kW / 7.0 HP',
        displacement: '212 cc 4T OHV',
        weight: '78.0 kg',
        application: 'Deep soil rotavating, paddy fields & vegetable beds',
      },
      {
        sku: 'ZYN-MC170',
        name: 'ZYN-MC170 Compact Mini Cultivator & Weeder',
        powerSpec: '3.0 kW / 4.0 HP',
        displacement: '160 cc / 52 cc',
        weight: '42.0 kg',
        application: 'Inter-row orchard weeding, greenhouses & narrow rows',
      },
      {
        sku: 'ZYN-EFI420',
        name: 'ZYN-EFI420 Heavy EFI Gasoline Power Tiller',
        powerSpec: '11.0 kW / 15.0 HP',
        displacement: '420 cc EFI',
        weight: '112.0 kg',
        application: 'High-altitude & heavy clay soil commercial cultivation',
      },
      {
        sku: 'ZYN-WC15',
        name: 'ZYN-WC15 Drum Wood Chipper & Hydraulic Log Splitter',
        powerSpec: '11.0 kW / 120mm',
        displacement: '420 cc OHV',
        weight: '185.0 kg',
        application: 'Biomass shredding, orchard pruning & firewood splitting',
      },
      {
        sku: 'ZYN-CT400',
        name: 'ZYN-CT400 Corn Thresher & Straw Chaff Cutter',
        powerSpec: '3.0 kW / 1,800 kg/hr',
        displacement: '196 cc / Electric',
        weight: '68.0 kg',
        application: 'Grain shelling & livestock fodder chaff preparation',
      },
    ],
  },

  // 4. SOLAR PANELS & SOLAR BOREHOLE PUMPS
  {
    id: 'line-solar',
    sku: 'ZYN-SP Series',
    name: 'Solar Submersible Pumps & PV Solar Systems',
    name_es: 'Bombas Solares Sumergibles y Paneles Fotovoltaicos',
    name_pt: 'Bombas Solares Submersas e Painéis Solares',
    name_fr: 'Pompes Solaires Immergées & Systèmes Photovoltaïques',
    name_ar: 'مضخات الآبار الشمسية والألواح الشمسية',
    name_de: 'Solare Tauchpumpen & Photovoltaik-Systeme',
    category: 'Solar',
    powerSpec: '750W – 3,000W',
    displacement: '3" / 4" SS304',
    weight: '16 – 38 kg',
    description:
      'Complete off-grid solar water pumping systems combining AISI-304 stainless steel brushless DC submersible pumps, MPPT controllers, and Tier-1 monocrystalline solar panels.',
    imageUrl: studioZaynovaSolarImg,
    explodedImageUrl: explodedOhvEngineImg,
    parts: OHV_ENGINE_PUMP_PARTS,
    status: 'Export Ready',
    highlights: [
      'High-Efficiency BLDC Permanent Magnet Oil-Cooled Motor',
      'IP68 MPPT Controller with Automatic Tank & Dry-Run Protection',
      'AC/DC Hybrid Compatibility for Continuous Farm Irrigation',
    ],
    subModels: [
      {
        sku: 'ZYN-SP1500',
        name: 'ZYN-SP1500 1.5kW DC Solar Borehole Pump Kit',
        powerSpec: '1,500W MPPT',
        displacement: 'Max Head 110m',
        weight: '24.0 kg',
        application: 'Agricultural drip irrigation & remote farm reservoirs',
      },
      {
        sku: 'ZYN-SP750',
        name: 'ZYN-SP750 750W Deep-Well Submersible Pump',
        powerSpec: '750W / 72V DC',
        displacement: 'Max Head 75m',
        weight: '16.5 kg',
        application: 'Livestock watering & community clean water wells',
      },
      {
        sku: 'ZYN-SP3000',
        name: 'ZYN-SP3000 3kW AC/DC Hybrid Solar Pump System',
        powerSpec: '3,000W Hybrid',
        displacement: 'Max Head 165m',
        weight: '38.0 kg',
        application: 'Large-scale commercial pivot & plantation irrigation',
      },
      {
        sku: 'ZYN-PV550',
        name: 'ZYN-PV550 Monocrystalline Half-Cell Solar Panels',
        powerSpec: '550W PERC',
        displacement: '21.3% Eff.',
        weight: '27.5 kg',
        application: 'Solar pump arrays & off-grid agro power stations',
      },
    ],
  },

  // 5. SPRAYING, FUMIGATION & CROP PROTECTION
  {
    id: 'line-sprayers',
    sku: 'ZYN-SF Series',
    name: 'Power Sprayers, Mist Dusters & Thermal Foggers',
    name_es: 'Fumigadoras, Atomizadores y Termonebulizadores',
    name_pt: 'Pulverizadores Costais, Atomizadores e Termonebulizadores',
    name_fr: 'Pulvérisateurs à Dos, Atomiseurs & Nébulisateurs Thermiques',
    name_ar: 'رشاشات المبيدات وأجهزة التضبيب الحراري',
    name_de: 'Rückenspritzen, Sprühgeräte & Thermal-Nebelgeräte',
    category: 'Spraying & Crop Protection',
    powerSpec: '0.8 – 2.5 kW',
    displacement: '26 – 63 cc / 20L',
    weight: '4.5 – 12.8 kg',
    description:
      'Complete agricultural crop protection and public health fumigation portfolio spanning Knapsack Power Sprayers, HTP Triplex Sprayers, Mist Blowers, and Thermal Foggers.',
    imageUrl: studioZaynovaSprayerImg,
    explodedImageUrl: explodedBrushcutterImg,
    parts: BRUSHCUTTER_PARTS,
    status: 'Export Ready',
    highlights: [
      'High-Density Chemical-Resistant UV-Stabilized Poly Tanks',
      'Forged Brass High-Pressure Plunger Pump Assemblies',
      'Stainless Steel Dual-Resonator Pulse-Jet Fogging Tubes',
    ],
    subModels: [
      {
        sku: 'ZYN-KS20',
        name: 'ZYN-KS20 2-Stroke / 4-Stroke Knapsack Power Sprayer',
        powerSpec: '1.0 kW / 25 Bar',
        displacement: '25.6 cc / 20L',
        weight: '9.6 kg',
        application: 'Vineyard, row-crop & orchard high-pressure misting',
      },
      {
        sku: 'ZYN-MD80',
        name: 'ZYN-MD80 Mist Duster & Granule Spreader Blower',
        powerSpec: '2.1 kW / 14m Throw',
        displacement: '42.7 cc / 14L',
        weight: '11.2 kg',
        application: 'Liquid chemical misting, dust & fertilizer spreading',
      },
      {
        sku: 'ZYN-TF150',
        name: 'ZYN-TF150 Pulse-Jet Thermal Fogger & Fumigator',
        powerSpec: '18.7 kW Pulse',
        displacement: '16L Dual Tank',
        weight: '10.8 kg',
        application: 'Municipal vector control, warehouses & greenhouses',
      },
      {
        sku: 'ZYN-HTP45',
        name: 'ZYN-HTP45 Stationary Triplex HTP Power Sprayer',
        powerSpec: '4.8 kW / 40 Bar',
        displacement: '196 cc / 45 L/m',
        weight: '34.0 kg',
        application: 'Tall fruit tree orchards & hose-reel estate spraying',
      },
      {
        sku: 'ZYN-MS16',
        name: 'ZYN-MS16 Manual & Battery Dual-Pump Knapsack Sprayer',
        powerSpec: '12V 12Ah / Manual',
        displacement: '16L / 20L Tank',
        weight: '4.5 kg',
        application: 'Smallholder crop care & herbicide application',
      },
    ],
  },

  // 6. GENERATORS, WATER PUMPS & ENGINES (GASOLINE / DIESEL)
  {
    id: 'line-power-pumps',
    sku: 'ZYN-GP Series',
    name: 'Generators, Inverters, Water Pumps & Engines',
    name_es: 'Generadores, Motores y Motobombas Diésel/Gasolina',
    name_pt: 'Geradores, Motores e Motobombas Diesel/Gasolina',
    name_fr: 'Groupes Électrogènes, Moteurs & Motopompes Diesel/Essence',
    name_ar: 'المولدات الكهربائية والمحركات ومضخات المياه',
    name_de: 'Stromerzeuger, Motoren & Wasserpumpen',
    category: 'Engines & Power Generation',
    powerSpec: '2.0 – 15.0 kW',
    displacement: '52 – 456 cc',
    weight: '8.5 – 158 kg',
    description:
      'Pure sine-wave gasoline inverter generators, silent acoustic diesel generators, centrifugal & 2-stroke agricultural water pumps, and standalone OHV/EFI/Diesel engines.',
    imageUrl: studioZaynovaGenPumpImg,
    explodedImageUrl: explodedOhvEngineImg,
    parts: OHV_ENGINE_PUMP_PARTS,
    status: 'Export Ready',
    highlights: [
      '100% Class-H Pure Copper Alternator Windings',
      'Cast-Iron Cylinder Liners Rated for 500-Hour Continuous Load',
      'Petrol, EFI, 2-Stroke, Diesel & Electric Motor Variants',
    ],
    subModels: [
      {
        sku: 'ZYN-INV3500',
        name: 'ZYN-INV3500 Silent Pure-Sine Inverter Generator',
        powerSpec: '3.5 kW Inverter',
        displacement: '212 cc OHV',
        weight: '34.0 kg',
        application: 'Precision jobsite tools, telecom backup & field clinics',
      },
      {
        sku: 'ZYN-DG7500',
        name: 'ZYN-DG7500 Silent Canopy Diesel Generator',
        powerSpec: '6.5 kVA / 5.5 kW',
        displacement: '456 cc Diesel',
        weight: '158.0 kg',
        application: 'Industrial standby power, construction & farms',
      },
      {
        sku: 'ZYN-WP30',
        name: 'ZYN-WP30 Centrifugal & Submersible Water Pumps',
        powerSpec: '5.2 kW / 60 m³/h',
        displacement: '212 cc / 2"–4"',
        weight: '26.5 kg',
        application: 'Flood irrigation, canal transfer & trench dewatering',
      },
      {
        sku: 'ZYN-WP2T',
        name: 'ZYN-WP2T 2-Stroke Portable Farm Water Pump',
        powerSpec: '1.65 kW / 12 m³/h',
        displacement: '42.7 cc / 1.5"',
        weight: '8.5 kg',
        application: 'Lightweight hillside & garden irrigation carry pump',
      },
      {
        sku: 'ZYN-GE212',
        name: 'ZYN-GE212 Standalone Petrol, EFI & Diesel Engines',
        powerSpec: '4.8 – 11.0 kW',
        displacement: '196 – 456 cc',
        weight: '16 – 48 kg',
        application: 'OEM replacement powerheads for mixers, tillers & pumps',
      },
    ],
  },

  // 7. PRESSURE WASHERS, VACUUMS & AIR COMPRESSORS
  {
    id: 'line-washing-air',
    sku: 'ZYN-PW Series',
    name: 'Pressure Washers, Air Compressors & Vacuums',
    name_es: 'Hidrolavadoras, Compresores de Aire y Aspiradoras',
    name_pt: 'Lavadoras de Alta Pressão, Compressores e Aspiradores',
    name_fr: 'Nettoyeurs Haute Pression, Compresseurs & Aspirateurs',
    name_ar: 'غسالات الضغط العالي وضواغط الهواء والمكانس الصناعية',
    name_de: 'Hochdruckreiniger, Kompressoren & Industriesauger',
    category: 'Pressure Washing & Cleaning',
    powerSpec: '1.8 – 5.5 kW',
    displacement: '150–250 Bar / 24–200L',
    weight: '14 – 72 kg',
    description:
      'Petrol and electric high-pressure washers, wet/dry commercial vacuum cleaners, and direct-driven or belt-driven workshop air compressors.',
    imageUrl: studioZaynovaWasherImg,
    explodedImageUrl: explodedBlowerWasherImg,
    parts: PUMP_TURBINE_PARTS,
    status: 'Export Ready',
    highlights: [
      'Forged Brass Triplex Ceramic-Plunger High-Pressure Pumps',
      'CE Pressure-Vessel Certified Air Compressor Receivers',
      'Commercial Induction Motors & Gasoline Engine Drives',
    ],
    subModels: [
      {
        sku: 'ZYN-PW220',
        name: 'ZYN-PW220 Gasoline High-Pressure Triplex Washer',
        powerSpec: '5.5 kW / 220 Bar',
        displacement: '212 cc Triplex',
        weight: '34.5 kg',
        application: 'Heavy fleet washdown, livestock barns & site cleaning',
      },
      {
        sku: 'ZYN-EM2200',
        name: 'ZYN-EM2200 Electric Induction Pressure Washer',
        powerSpec: '2.2 kW / 160 Bar',
        displacement: '230V / 110V IPX5',
        weight: '19.5 kg',
        application: 'Home-use & commercial detailing with auto total-stop',
      },
      {
        sku: 'ZYN-AC50',
        name: 'ZYN-AC50 Direct-Driven & Portable Air Compressors',
        powerSpec: '2.2 kW / 8 Bar',
        displacement: '24L / 50L / 100L',
        weight: '38.0 kg',
        application: 'Automotive workshops, pneumatic nailing & spray booths',
      },
      {
        sku: 'ZYN-VAC80',
        name: 'ZYN-VAC80 Commercial Wet & Dry Vacuum Cleaner',
        powerSpec: '3,000W Triple Motor',
        displacement: '80L SS Tank',
        weight: '26.0 kg',
        application: 'Industrial warehouses, car washes & construction dust',
      },
    ],
  },

  // 8. CONSTRUCTION, WELDING & SPECIAL MACHINERY
  {
    id: 'line-construction',
    sku: 'ZYN-CM Series',
    name: 'Construction Compactors, Mixers, Welders & Dumpers',
    name_es: 'Compactadoras, Hormigoneras, Soldadoras y Volquetes',
    name_pt: 'Compactadores, Betoneiras, Soldadoras e Mini Dumpers',
    name_fr: 'Plaques Vibrantes, Bétonnières, Soudeurs & Mini-Tombereaux',
    name_ar: 'معدات البناء والدمك واللحام الصناعي',
    name_de: 'Baumaschinen, Rüttelplatten, Mischer & Schweißgeräte',
    category: 'Construction Equipment',
    powerSpec: '4.0 – 11.0 kW',
    displacement: '196 cc / 250A IGBT',
    weight: '7.8 – 155 kg',
    description:
      'Civil construction machinery including Plate Compactors, Tamping Rammers, Concrete Mixers, Cutters, Vibrators, Power Trowels, IGBT Welders, Trenchers, and Mini Dumpers.',
    imageUrl: studioZaynovaConstructionImg,
    explodedImageUrl: explodedOhvEngineImg,
    parts: OHV_ENGINE_PUMP_PARTS,
    status: 'Export Ready',
    highlights: [
      'Ductile Iron Compactor Base Plates & German-Spec Bellows',
      'Industrial IGBT Inverter Welders (160V–265V Wide Input)',
      'Heavy-Duty Trenchers, Mini Dumpers & Turbine Leaf Blowers',
    ],
    subModels: [
      {
        sku: 'ZYN-CM90',
        name: 'ZYN-CM90 Forward & Reversible Plate Compactor',
        powerSpec: '4.8 kW / 15–30 kN',
        displacement: '196 cc OHV',
        weight: '89.0 kg',
        application: 'Asphalt paving, interlocking block & trench compaction',
      },
      {
        sku: 'ZYN-TR80',
        name: 'ZYN-TR80 Heavy Impact Tamping Rammer',
        powerSpec: '3.0 kW / 14 kN',
        displacement: '149 cc 4T',
        weight: '78.0 kg',
        application: 'Cohesive clay & foundation backfill compaction',
      },
      {
        sku: 'ZYN-CM350',
        name: 'ZYN-CM350 Concrete Mixer, Cutter, Vibrator & Trowel',
        powerSpec: '4.8 – 9.5 kW',
        displacement: '350L / 450mm Blade',
        weight: '115.0 kg',
        application: 'Concrete batching, slab finishing & expansion joint cutting',
      },
      {
        sku: 'ZYN-WELD250',
        name: 'ZYN-WELD250 IGBT Inverter Welder & Electric Motors',
        powerSpec: '250A MMA / TIG',
        displacement: '60% Duty Cycle',
        weight: '7.8 kg',
        application: 'Structural steel fabrication & workshop repair',
      },
      {
        sku: 'ZYN-MD500',
        name: 'ZYN-MD500 Tracked Mini Dumper, Trencher & Blower',
        powerSpec: '4.8 kW / 500 kg',
        displacement: '196 cc / 64.8 cc',
        weight: '155.0 kg',
        application: 'Site haulage, irrigation trenching & municipal leaf clearing',
      },
    ],
  },

  // 9. POWER TOOLS, HAND TOOLS & OEM SPARE PARTS
  {
    id: 'line-tools-spares',
    sku: 'ZYN-OEM Series',
    name: 'Power Tools, Hand Tools & OEM Spare Parts',
    name_es: 'Herramientas Eléctricas, Manuales y Repuestos OEM',
    name_pt: 'Ferramentas Elétricas, Manuais e Peças de Reposição',
    name_fr: 'Outillage Électroportatif, Outils à Main & Pièces OEM',
    name_ar: 'الأدوات الكهربائية واليدوية وقطع الغيار الأصلية',
    name_de: 'Elektrowerkzeuge, Handwerkzeuge & OEM-Ersatzteile',
    category: 'Spare Parts & Aftermarket',
    powerSpec: '21V BLDC / Cr-V / OEM',
    displacement: 'Full Line Coverage',
    weight: '0.2 – 6.4 kg',
    description:
      'DC Brushless, DC Brushed & AC Professional Power Tools, Cr-V Construction/Garden Hand Tools, and guaranteed 10-year supply of Carburetors, Piston Kits, Ignition Coils, Bars & Pump Spares.',
    imageUrl: studioZaynovaPowerToolsImg,
    explodedImageUrl: explodedPowerToolImg,
    parts: POWERTOOL_GEARBOX_PARTS,
    status: 'Export Ready',
    highlights: [
      'Cross-Compatible 21V Brushless Battery Power Tool Ecosystem',
      'DIN-Standard Drop-Forged Chrome-Vanadium Hand Tool Sets',
      'Complete Aftermarket OEM Spares for All OPE & Engine Models',
    ],
    subModels: [
      {
        sku: 'ZYN-BL21V',
        name: 'ZYN-BL21V DC Brushless Drills, Impact Tools & Grinders',
        powerSpec: '21V 4.0Ah BLDC',
        displacement: '115 Nm Planetary',
        weight: '1.8 kg',
        application: 'Cordless industrial drilling, masonry & steel fastening',
      },
      {
        sku: 'ZYN-AC1200',
        name: 'ZYN-AC1200 AC Pro Angle Grinders, Saws & Drill Bits',
        powerSpec: '850 – 2,200W AC',
        displacement: '115 / 125 / 230mm',
        weight: '2.4 kg',
        application: 'Metal grinding, circular wood cutting & abrasive work',
      },
      {
        sku: 'ZYN-HT108',
        name: 'ZYN-HT108 Agricultural, Construction & Garden Hand Tools',
        powerSpec: 'Cr-V HRC 58–62',
        displacement: '108-Pc & Pruning',
        weight: '6.4 kg',
        application: 'Workshop wrenches, digging tools, shears & loppers',
      },
      {
        sku: 'ZYN-SPARE-ENG',
        name: 'ZYN-SPARE-ENG Carburetors, Piston Kits, Filters & Ignition',
        powerSpec: '100% OEM Spec',
        displacement: '2T & 4T Engines',
        weight: 'Barcoded Kit',
        application: 'Engine overhauls for chainsaws, tillers, pumps & generators',
      },
      {
        sku: 'ZYN-SPARE-OPE',
        name: 'ZYN-SPARE-OPE Chainsaw Bars, Brushcutter Gearheads & Seals',
        powerSpec: '65Mn / Brass',
        displacement: 'OPE & Sprayers',
        weight: 'Barcoded Kit',
        application: 'Replacement bars, chains, bevel gears, sprayer & washer kits',
      },
    ],
  },
];

export const DEFAULT_CATALOGS: CatalogItem[] = [
  {
    id: 'cat-master-2026',
    title: 'ZAYNOVA 2026 All-in-One Master Export Catalogue (PDF)',
    edition: '2026 · Complete Edition',
    category: 'All 9 Divisions · 40+ Core Models',
    language: 'EN · ES · PT · FR · AR · DE',
    pageCount: 'All-in-One PDF',
    fileSize: 'Instant Multilingual PDF',
    description:
      'Unified master product catalogue containing all ZAYNOVA Agro-Industrial Tillers, Forestry Chainsaws & Brush Cutters, Solar Borehole Systems, Sprayers, Generators, Water Pumps, Pressure Washers, Construction Machinery, Power Tools & OEM Spare Parts.',
    coverImage: catalogCoverImg,
    downloadUrl: '',
  },
];

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  brandName: 'ZAYNOVA',
  logoUrl: '',
  exportEmail: '',
  hqLocation: 'ZAYNOVA Industrial Corporation · ISO 9001 Manufacturing',
};
