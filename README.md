# dirStructToMd
A simple node.js script to generate markdown text descibing a directories structure.

Usage:

    $ node main.js root_directory_to_parse [options]
    
    options:
        -o, --output: choose output file
        -c, --config: use a json config file [To Be Done]
        
As example, the current project is:

    .
    +-- _dir.md
    +-- _dir1
    |	+-- _dir2
    |	|	+-- _dir3
    |	|	|	+-- _oo.html
    |	+-- _file.js
    |	+-- _file.json
    +-- _file.js
    
