#!/usr/bin/env python3
"""Module for multiplier function"""
from typing import Callable

def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Returns a function that multiplies by multiplier"""
    def inner(x: float) -> float:
        return x * multiplier
    return inner
