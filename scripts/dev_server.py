"""Serve the project root with live reload (dev dependency: livereload)."""
import os
from pathlib import Path

from livereload import Server

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    port = int(os.environ.get("PORT", "8000"))
    server = Server()
    root = str(ROOT)
    server.watch(root + "/index.html")
    server.watch(root + "/assets")
    server.serve(root=root, port=port, liveport=35729)


if __name__ == "__main__":
    main()
