# Skill: Input Parser

## Description
This skill acts as the first gatekeeper. It validates if the input has sufficient facts and classifies information into Data, Doing, and Interpretation.

## Input (Context)
- `input_text`: The raw situation text from the user.

## Output (Context)
- `factGuard`: { status, facts }
- `inputClassification`: { data, doing, interpretation }

## Template
- `default.txt`: Standard prompt for parsing.
