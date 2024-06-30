# User Management Script

This project contains a bash script named `manage_users.sh` to automate the process of user creation, permission management, and file setup in a Linux environment.

## Features

### Basic Tasks
1. **Create Users with Unique Usernames**
   - Takes a list of usernames from an input file (`usernames.csv`). Each line in the file represents a user's data, formatted as `username,group,permission`.
   - For each entry in the file, creates a new user with a home directory.

2. **Set Up Specific Permissions and Group Assignments**
   - Assigns each user to the group specified in their line of the input file.
   - Ensures that the user's home directory is accessible only by the user and the group specified, applying the permissions as listed in the file.

3. **Create Directories and Files for Each User**
   - Within each user's home directory, creates a directory named `projects`.
   - Inside the `projects` directory, creates a file named `README.md` with a personalized welcome message.

### Bonus Tasks
1. **Logging and Auditing**
   - Implements logging to record actions such as user creation, permission changes, and errors.
   - Writes logs to a file named `manage_users.log`.

2. **Interactive Mode**
   - Allows the script to run in an interactive mode where it prompts the user for input.
   - Includes options to interactively add, delete, or modify users and their permissions.

3. **Automated User Cleanup**
   - Uses a cron job to periodically identify and disable or remove user accounts that have been inactive for a predefined period.
   - Logs the last active dates for users and uses these logs to determine which accounts should be considered for deactivation or removal.

## Prerequisites

- Linux environment

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/manage-users.git
    cd manage-users
    ```

2. **Make the Script Executable**

    ```bash
    chmod +x manage_users.sh
    ```

3. **Run the Script**

    ```bash
    sudo ./manage_users.sh usernames.csv
    ```

    **Note**: The script must be run as root (using `sudo`) to create users and modify permissions.

## Input File Format

The input file `usernames.csv` should be formatted as follows:

john.doe,devops,755
jane.doe,developers,700