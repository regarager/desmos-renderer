# Desmos SVG Renderer

## Requirements

1. Node.js

## Installation

1. Clone this repo
2. Type `npm install` or `yarn install` \(for Yarn only\)
3. Run `mkdir in out result`

## Usage

1. Use a tool like `ffmpeg` to split a video into individual frames
2. Put the frames into `in/` \(must be .png, .jpeg, .jpg, adding more soon\)
3. Run `npm start` or `yarn start` \(for Yarn only\)
4. Go to `localhost:8000`
5. Open up the console \(supposed to be `F12`\) and type `renderFrame()`
6. Wait for everything to render

## Example

![Desmos in Desmos](github/logo.png)

## Important Notices

If you put an image in `in/` and run `server/traceFrame.js` multiple times, there may be strange problems with some edges being removed by `jimp` \(library used for increasing contrast\)
Before:
![Before](github/before.png)
After:
![After](github/after.png)
