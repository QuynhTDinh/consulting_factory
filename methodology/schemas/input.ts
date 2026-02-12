/**
 * Input Schemas for Consulting Engineering Factory
 * Defines the structure of "Raw Materials" that will be processed by Agents.
 */

import { BattleField, Dimension3D, JobType } from './core';

// Common context for any input story
export interface Context {
  industry: string; // e.g., "Life Insurance", "Study Abroad"
  consultant_level: 'Novice' | 'Intermediate' | 'Expert';
  customer_profile: string; // Brief description of the customer
  touchpoint: string; // Where the interaction happened (Meeting, Call, Chat)
}

/**
 * THE SCAR (Vết sẹo)
 * Represents a failure or a mistake that led to a painful lesson.
 */
export interface Scar {
  id: string;
  title: string; // Short name for the scar
  context: Context;
  myth: string; // The wrong belief held by the consultant at that time
  action: string; // What they did wrong based on that belief
  consequence: string; // The negative outcome
  pain_level: 1 | 2 | 3 | 4 | 5; // How painful was it?
  reflection: string; // What they realized AFTER the failure
  tags: string[];
}

/**
 * THE VICTORY (Chiến tích)
 * Represents a success where the consultant correctly "engineered" the result.
 */
export interface Victory {
  id: string;
  title: string;
  context: Context;
  challenge: string; // The difficult situation
  insight: string; // The "Aha" moment regarding the customer's hidden need
  applied_frameworks: {
    jtbd?: JobType[];
    battle_field?: BattleField;
    dimension_3d?: Dimension3D; // If they used 3D to interpret signal
  };
  strategy: string; // The specific action taken based on insight
  result: string; // Measurable outcome (Deal closed, Objection handled)
  tags: string[];
}
