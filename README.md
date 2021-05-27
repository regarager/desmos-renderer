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

## `config.js` Guide

| Field Name          | Default Value | Explanation                                    |
| ------------------- | ------------- | ---------------------------------------------- |
| `frameNumberLength` | 4             | Length of frame id                             |
| `edgeSize`          | 4             | Width of edge for `gm` edge detection function |

## Useful Commands with `ffmpeg`

1. `ffmpeg -framerate 1 -pattern_type glob -i '*.png' -c:v libx264 -pix_fmt yuv420p out.mp4` \(converts images into a video\)
2. `ffmpeg -i in.mp4 frame%04d.png -hide_banner` \(converts videos into image\)
3. `-vf pad="width=ceil(iw/2)*2:height=ceil(ih/2)*2"` add this flag to the first command if you get a `height not divisible by 2` error

## Example

![Desmos in Desmos](github/logo.png)

## Important Notices

Currently there are possible bugs with large amounts of input images. If there are any bugs, please make an issue, but it is likely that I cannot fix it as the error is most likely going to be caused by a dependency. \(currently cause of error is unknown, but appears to be caused by large amounts of frames\)
