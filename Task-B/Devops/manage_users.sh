#!/bin/bash

LOG_FILE="manage_users.log"

# Function to create users, set permissions, and create files
create_users() {
    input_file="$1"

    while IFS=',' read -r username group permissions; do
        # Create user if not exists
        if ! id "$username" &>/dev/null; then
            sudo useradd -m -s /bin/bash "$username"
            echo "User $username created." | tee -a "$LOG_FILE"
        else
            echo "User $username already exists. Skipping creation." | tee -a "$LOG_FILE"
        fi

        # Set group for the user
        sudo usermod -aG "$group" "$username"
        echo "User $username added to group $group." | tee -a "$LOG_FILE"

        # Set permissions on home directory
        sudo chmod "$permissions" "/home/$username"
        echo "Permissions $permissions set for /home/$username." | tee -a "$LOG_FILE"

        # Create projects directory and README.md
        sudo -u "$username" mkdir -p "/home/$username/projects"
        echo "Created /home/$username/projects directory." | tee -a "$LOG_FILE"
        sudo -u "$username" sh -c "echo \"Welcome, $username! This is your projects directory.\" > /home/$username/projects/README.md"
        echo "Created README.md in /home/$username/projects." | tee -a "$LOG_FILE"
        
        echo "---" | tee -a "$LOG_FILE"  # Separator for each user action
    done < "$input_file"
}

# Main script execution
if [[ ! -f "$LOG_FILE" ]]; then
    touch "$LOG_FILE"
fi

echo "Starting user management script at $(date)" | tee -a "$LOG_FILE"

# Check if sudo access is available
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (sudo)." | tee -a "$LOG_FILE"
   exit 1
fi

# Provide input file as an argument to the script
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <input_file>"
    exit 1
fi

input_file="$1"

# Validate input file
if [[ ! -f "$input_file" ]]; then
    echo "Error: Input file $input_file not found." | tee -a "$LOG_FILE"
    exit 1
fi

# Execute function to create users and manage permissions
create_users "$input_file"

echo "Script execution completed at $(date)" | tee -a "$LOG_FILE"

