Intro camera asset
===================

• intro-camera.png — used on the site (checkerboard / light background removed).
• intro-camera-source.png — original upload; replace this if you swap the image.

To rebuild intro-camera.png after changing the source:

  python scripts/process_intro_camera.py

Requires: pip install pillow numpy

Note: Stock images may include visible watermarks on the camera itself; those are not removed by the script. For production, use a licensed or original photo/render without watermarks.
