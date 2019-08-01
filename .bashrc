# creates a new module
createModule(){
    if [ -d src/"$2"/modules ]; then
        cd src/"$2"/modules
        mkdir "$1"
        cd "$1"
        touch "$1.js" && touch routes.js && touch service.js
        cp ../../../../stubs/routes.stub.js routes.js
        mkdir store && mkdir views && mkdir components
        cd components && touch .gitkeep && cd ..
        cd views && touch .gitkeep && cd ..
        cd store
        touch action-types.js && touch actions.js && touch reducer.js
        cp ../../../../../stubs/reducer.stub.js reducer.js
        cd ../../../../..
        echo "Created ${1} module successfully!"
    else 
        echo "Directory ${2} Not found!"
    fi
}

# creates a new component inside a module
createComponent(){
    cd src/"$3"/modules/"$2"
    cd components
    mkdir "$1"
    cd "$1"
    touch "$1.js"
    cp ../../../../../../stubs/component.stub.js "$1.js"
    cd ../../../../../..
    echo "Created ${1} component successfully!"
    
}