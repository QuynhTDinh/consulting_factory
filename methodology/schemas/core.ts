/**
 * Core Framework Schemas
 * The "Physics" of the Consulting World.
 */

// ==========================================
// 1. JOBS TO BE DONE (JTBD)
// ==========================================
export enum JobType {
    FUNCTIONAL = 'Functional', // The task they want to get done
    EMOTIONAL_PERSONAL = 'Emotional_Personal', // How they want to feel
    EMOTIONAL_SOCIAL = 'Emotional_Social', // How they want to be perceived
}

export interface JTBD {
    type: JobType;
    description: string;
    examples: string[];
}

// ==========================================
// 2. THE 6 BATTLE FIELDS (6 Chiến trường tâm lý)
// ==========================================
export enum BattleField {
    BF1_IGNORE = 'Ignore', // Khách hàng lờ đi, không quan tâm
    BF2_SKEPTICISM = 'Skepticism', // Nghi ngờ, không tin
    BF3_DELAY = 'Delay', // Trì hoãn decision
    BF4_PRICE = 'Price', // So đo về giá
    BF5_COMPETITOR = 'Competitor', // So sánh với đối thủ
    BF6_INTERNAL = 'Internal', // Mâu thuẫn nội bộ gia đình/công ty
}

export interface BattleFieldInfo {
    id: BattleField;
    name: string;
    symptoms: string[]; // Signs that the customer is in this field
    strategy: string; // Core strategy to win this field
}

// ==========================================
// 3. 3D (DATA - DOING - INTERPRETATION)
// ==========================================
export interface Dimension3D {
    data: string; // What they SAID or the objective Facts
    doing: string; // What they DID (Body language, tone, action)
    interpretation: string; // What it REALLY means (The Hidden Truth)
}
