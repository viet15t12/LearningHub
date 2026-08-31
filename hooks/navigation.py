"""Keep previous/next navigation inside each learning path."""

from pathlib import PurePosixPath


def _learning_path(page):
    parts = PurePosixPath(page.file.src_uri).parts
    return parts[0] if len(parts) > 1 else None


def on_page_context(context, page, **kwargs):
    """Remove footer links that cross a top-level docs directory."""
    learning_path = _learning_path(page)

    if page.previous_page and _learning_path(page.previous_page) != learning_path:
        page.previous_page = None
    if page.next_page and _learning_path(page.next_page) != learning_path:
        page.next_page = None

    return context
