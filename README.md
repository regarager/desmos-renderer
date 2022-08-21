# Desmos Image Renderer

## Useful Scripts (found in /scripts)
### `joinVideo.sh`
* Arguments: `dir` (where this project is downloaded e.g. Downloads/desmos-renderer) `framerate` (determines the framerate of the output video)

### `splitVideo.sh`
* Arguments: `fileName` (this file is split into frames in /renders/input/) `dir` (where this project is downloaded e.g. Downloads/desmos-renderer)

## Useful Commands
### `ffmpeg -i <file>.mkv -c copy <file>.mp4`
* Used for converting .mkv files from `youtube-dl` into .mp4 files