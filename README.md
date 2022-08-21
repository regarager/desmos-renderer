# Desmos Image Renderer

## How to Use
### Installation
* Requirements: `npm` or `yarn`
* Steps:
    1. `npm install` or `yarn install`
### Running the program
1. Copy image(s) into `/renders/input/`
2. Run `npm start` or `yarn start`
3. Wait for the server to start (there will be a message in console)
4. Open `localhost:8080` or `localhost:8080/autostart` (if you go here skip the next step)
5. Open the console in your browser and run `main()`
6. The graphed images will be screenshotted and sent to `/renders/output/`

## Useful Scripts (found in /scripts, very buggy)
### `joinVideo.sh`
* Arguments: `dir` (where this project is downloaded e.g. Downloads/desmos-renderer) `framerate` (determines the framerate of the output video)

### `splitVideo.sh`
* Arguments: `fileName` (this file is split into frames in /renders/input/) `dir` (where this project is downloaded e.g. Downloads/desmos-renderer)

## Useful Commands
### `ffmpeg -i <file>.mkv -c copy <file>.mp4`
* Used for converting .mkv files from `youtube-dl` into .mp4 files