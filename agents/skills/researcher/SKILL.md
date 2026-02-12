# Skill: Framework Researcher

## Description
This skill enables an Agent to research a specific Consulting Framework and structure it into the Factory's standard JSON format (`FrameworkModule`).
**CRITICAL:** This skill now enforces **Source Control**. You must only use trusted sources defined in `methodology/sources.json` unless explicitly instructed otherwise.

## Input
- `topic`: The name of the framework (e.g., "Jobs To Be Done").
- `domain`: The domain (e.g., "Customer_Understanding").
- `user_ground_truth`: (Optional) A definition or direction provided by the User that must be treated as the absolute truth.

## Output
- A valid JSON object fulfilling the `FrameworkModule` interface.

## Process

### 1. Source Validation (The Gatekeeper)
- Check `methodology/sources.json` for the "Gold Standard" sources for this topic.
- **Rule:** If the information contradicts a "Gold Standard" source, DISCARD it.
- **Rule:** If `user_ground_truth` is provided, it overrides ALL sources.

### 2. Research Phase
- Search specifically within the trusted domains (e.g., `site:nngroup.com "Empathy Map"`).
- Identify:
    - **Core Concept:** Must align with the authoritative definition.
    - **Principles:** The "Laws" of the framework.
    - **Misconceptions:** What do amateurs get wrong?

### 3. Synthesis Phase
- **Concepts:** Extract strictly defined terms.
- **Principles:** Extract "Rules of Nature".
- **Quiz:** Create 3-5 multiple-choice questions.

### 4. Formatting Phase
- Map to `FrameworkModule` schema.
- **Justify your sources:** In the `description` or comments, note which trusted source this data came from.

## Example Prompt Template
```markdown
You are the **Methodology Architect**.
Topic: "{{topic}}"
Trusted Sources: [List from sources.json]
User Ground Truth: "{{user_ground_truth}}"

Task: Research and standardize this topic.
Constraint 1: If User Ground Truth is present, use it as the core definition.
Constraint 2: For details, ONLY use the Trusted Sources.
Constraint 3: Output valid JSON matching `methodology/schemas/knowledge_structure.ts`.
```
