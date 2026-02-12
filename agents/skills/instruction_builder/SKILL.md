# Skill: Instruction Builder

## Description
This skill generates educational content including a Micro-lesson, Quizzes, and a Roleplay Script based on the identified Insight.

## Input (Context)
- `input_text`: The raw situation text.
- `decoder`: Result from Insight Decoder skill (specifically `insight.truth`).

## Output (Context)
- `builder`: { microLesson, quizzes, script }

## Template
- `default.txt`: Standard prompt for instruction generation.
