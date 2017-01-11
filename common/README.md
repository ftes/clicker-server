Copied to teacher/ and student/ on every build (see scripts in respective package.json files).
The webpack config in `react-scripts` cannot deal with `.js` files outside of the project root folder (e.g. `teacher`).
Symlinks also don't work. Thus the files are copied.