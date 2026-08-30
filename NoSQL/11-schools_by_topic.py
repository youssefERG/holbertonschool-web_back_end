#!/usr/bin/env python3
"""Find schools by topic."""


def schools_by_topic(mongo_collection, topic):
    """Return schools that teach topic."""
    return [school for school in mongo_collection.find({"topics": topic})]