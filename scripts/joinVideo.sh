dir=`readlink -f ./`
echo "Enter the framerate of the output video"

read framerate

ffmpeg $dir/renders/output/frame%d.png -c:v libx264 -r $framerate $dir/renders/output.mp4