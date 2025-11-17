export interface HairStyle {
  id: string
  name: string
  description: string
  imageUrl: string
  tags: string[]
  colors?: string[]
}

export interface HairColor {
  id: string
  name: string
  hex: string
  level: number // 1-10 hair level
  tone: string // warm, cool, neutral
  brand?: string
}

export interface ColorFormula {
  brand: string
  baseColor: string
  developer: {
    volume: number // 10, 20, 30, 40
    ratio: string // "1:1", "1:1.5", "1:2"
  }
  additives?: {
    name: string
    amount: string
  }[]
  processingTime: number // minutes
  applicationNotes: string
}

export interface ClientConsultation {
  id: string
  clientName: string
  date: Date
  currentHairPhoto?: string
  desiredStyleDescription: string
  selectedStyle?: HairStyle
  selectedColor?: HairColor
  formula?: ColorFormula
  generatedPreview?: string
  notes: string
  status: 'in_progress' | 'completed' | 'saved'
}

export interface StyleGenerationRequest {
  description: string
  currentHairPhoto?: string
  referenceImages?: string[]
}

export interface FormulaCalculationRequest {
  currentLevel: number // 1-10
  targetLevel: number // 1-10
  targetTone: string
  hairPorosity: 'low' | 'medium' | 'high'
  hairCondition: 'healthy' | 'slightly_damaged' | 'damaged' | 'very_damaged'
  brand: string
}
