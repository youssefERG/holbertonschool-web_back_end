#!/usr/bin/env python3
"""Module for async generator."""

import asyncio
import random

async def async_generator():
    """Yields 10 random numbers after 1 second delays."""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
