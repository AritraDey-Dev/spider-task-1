#!/bin/bash

LOGFILE="manage_users.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOGFILE
}


create_user() {
    local username=$1
    local group=$2
    local permission=$3

    if ! getent group $group > /dev/null; then
        sudo groupadd $group
        log "Group $group created."
    fi


    if ! id -u $username > /dev/null 2>&1; then
        sudo useradd -m -d /home/$username -s /bin/bash -g $group $username
        log "User $username created and added to group $group."
    else
        log "User $username already exists."
    fi

    sudo chmod $permission /home/$username
    log "Permissions set to $permission for /home/$username."

    sudo mkdir -p /home/$username/projects
    log "Directory /home/$username/projects created."

 
    echo "Welcome, $username! some intro message here." | sudo tee /home/$username/projects/README.md > /dev/null
    log "README.md file created in /home/$username/projects with welcome message."

 
    sudo chown -R $username:$group /home/$username/projects
    sudo chmod 755 /home/$username/projects
    sudo chmod 644 /home/$username/projects/README.md
    log "Ownership and permissions set for /home/$username/projects and its contents."
}


delete_user() {
    local username=$1


    if id -u $username > /dev/null 2>&1; then
        sudo userdel -r $username
        log "User $username deleted along with their home directory."
    else
        log "User $username does not exist, skipping deletion."
    fi
}

modify_user_permissions() {
    local username=$1
    local permission=$2


    if id -u $username > /dev/null 2>&1; then
        sudo chmod $permission /home/$username
        log "Permissions for /home/$username changed to $permission."
    else
        log "User $username does not exist, cannot change permissions."
    fi
}

interactive_mode() {
    while true; do
        echo "Interactive Mode:"
        echo "1. Add User"
        echo "2. Delete User"
        echo "3. Modify User Permissions"
        echo "4. Exit"

        read -p "Choose an option: " option

        case $option in
            1)
                read -p "Enter username: " username
                read -p "Enter group: " group
                read -p "Enter permissions (e.g., 755): " permission
                create_user $username $group $permission
                ;;
            2)
                read -p "Enter username: " username
                delete_user $username
                ;;
            3)
                read -p "Enter username: " username
                read -p "Enter new permissions (e.g., 755): " permission
                modify_user_permissions $username $permission
                ;;
            4)
                echo "Exiting interactive mode."
                break
                ;;
            *)
                echo "Invalid option, please try again."
                ;;
        esac
    done
}


if [ "$1" != "-i" ]; then
    
    if [ ! -f usernames.csv ]; then
        log "Input file usernames.csv not found!"
        exit 1
    fi

    while IFS=, read -r username group permission; do
        create_user $username $group $permission
    done < usernames.csv

    log "User creation, permission management, and file setup completed successfully."
else
    interactive_mode
fi

