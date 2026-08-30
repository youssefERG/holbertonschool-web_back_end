#!/usr/bin/env python3
"""Update a school's topics."""


def update_topics(mongo_collection, name, topics):
    """Replace the topics of the school matching name."""
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )