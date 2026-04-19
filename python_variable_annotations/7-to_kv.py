#!/usr/bin/env python3
"""Module for key-value tuple"""
from typing import Union, Tuple

def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns tuple with square value"""
    return (k, float(v * v))
