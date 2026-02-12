import sys
import os

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.main import app

# Vercel needs a variable named 'app'
# This file serves as the entry point for Vercel Serverless Functions
