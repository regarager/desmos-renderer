dir=`readlink -f ./`
echo "Enter the file you want to split into frames"

read inFile

ffmpeg $dir/renders/input/frame%06d.jpg -hide_banner -i $inFile