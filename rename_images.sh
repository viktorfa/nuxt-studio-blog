#!/bin/bash

# Function to replace spaces with underscores in file names
rename_files() {
    find "$1" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.jpeg" \) -print0 | while read -d $'\0' file
    do
        # Replace spaces with underscores in the filename
        newname=$(echo "$file" | tr ' ' '_')
        
        # Check if new name differs from the old name
        if [ "$file" != "$newname" ]; then
            # Rename the file
            mv "$file" "$newname"
            echo "Renamed: $file -> $newname"
        fi
    done
}

# Call the function with the directory to start from
# Replace '/path/to/folder' with the path to your folder
rename_files './content'
