#!/usr/bin/env python3
"""Lists all documents in a MongoDB collection."""


def list_all(mongo_collection):
    """Return every document in mongo_collection."""
    return [document for document in mongo_collection.find()]